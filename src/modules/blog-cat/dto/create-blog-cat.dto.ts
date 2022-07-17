import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBlogCatDto {
  @IsNotEmpty()
  cat_id: number;

  @IsNotEmpty()
  blog_id: number;
}
