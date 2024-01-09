import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  ownerId: string;
}
