import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCommentMDto {
  @IsNotEmpty()
  context: string;

  @IsNotEmpty()
  blog_id: number;

  @IsOptional()
  parent?: number;
}
