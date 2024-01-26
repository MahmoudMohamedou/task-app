import { Injectable, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { context } from 'config';
import { Request } from 'express';

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto, @Req() req: Request) {
    const newTask = await context.task.create({
      data: {
        ...createTaskDto,
        ownerId: req.session.user.id,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return newTask;
  }

  async findAll() {
    const data = await context.task.findMany({
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return data;
  }

  async findOne(id: string) {
    return await context.task.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await context.task.update({
      data: updateTaskDto,
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await context.task.delete({ where: { id } });
  }
}
