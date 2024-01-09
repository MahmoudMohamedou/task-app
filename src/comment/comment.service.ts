import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { context } from 'config';

@Injectable()
export class CommentService {
  async create(createCommentDto: CreateCommentDto) {
    return await context.comment.create({
      data: createCommentDto,
    });
  }

  async findAll() {
    return await context.comment.findMany();
  }

  async findOne(id: string) {
    return await context.comment.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await context.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    return await context.comment.delete({
      where: { id },
    });
  }
}
