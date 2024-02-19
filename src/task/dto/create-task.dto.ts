import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  priority?: string;
  @IsString()
  @IsOptional()
  assigneeId?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  status: string;
}
