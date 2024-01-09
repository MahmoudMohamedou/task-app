import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  @IsUUID()
  posterId: string;
  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}
