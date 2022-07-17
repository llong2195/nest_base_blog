import { IsNotEmpty } from 'class-validator';

export class CreateBlogTagDto {
  @IsNotEmpty()
  tag_id: number;

  @IsNotEmpty()
  blog_id: number;
}
