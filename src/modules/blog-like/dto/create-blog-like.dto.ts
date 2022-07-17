import { IsNotEmpty } from 'class-validator';

export class CreateBlogLikeDto {
  @IsNotEmpty()
  blog_id: number;

  @IsNotEmpty()
  user_id: number;
}
