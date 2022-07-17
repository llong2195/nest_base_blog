import { Controller } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';

@Controller('blog-like')
export class BlogLikeController {
  constructor(private readonly blogLikeService: BlogLikeService) {}
}
