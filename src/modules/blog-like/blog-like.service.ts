import { Injectable } from '@nestjs/common';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { BaseService } from '../../base/base.service';
import { BlogLike } from './entities/blog-like.entity';
import { BlogLikeRepository } from './blog-like.repository';
import { LoggerService } from '../../logger/custom.logger';

@Injectable()
export class BlogLikeService extends BaseService<BlogLike, BlogLikeRepository> {
  constructor(repository: BlogLikeRepository, logger: LoggerService) {
    super(repository, logger);
  }
  async create(createBlogLikeDto: CreateBlogLikeDto): Promise<BlogLike> {
    const createBlogLike = new BlogLike(createBlogLikeDto);
    const blogLike = this.store(createBlogLike);
    return blogLike;
  }
  async unlike({ blog_id, user_id }: { blog_id: number; user_id: number }) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .where('blog_id = :blog_id', { blog_id: blog_id })
      .andWhere('user_id = :user_id', { user_id: user_id })
      .execute();
  }
}
