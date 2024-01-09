import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { context } from 'config';

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto) {
    const newTask = await context.task.create({
      data: createTaskDto,
    });
    return newTask;
  }

  async findAll() {
    return await context.task.findMany();
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
    });
  }

  async remove(id: string) {
    return await context.task.delete({ where: { id } });
  }
}
