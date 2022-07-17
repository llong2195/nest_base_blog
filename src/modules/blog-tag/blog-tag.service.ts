import { Injectable } from '@nestjs/common';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog-tag.dto';
import { BaseService } from '../../base/base.service';
import { BlogTag } from './entities/blog-tag.entity';
import { LoggerService } from '../../logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';
import { BlogTagRepository } from './blog-tag.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BlogTagService extends BaseService<BlogTag, BlogTagRepository> {
  constructor(repository: BlogTagRepository, logger: LoggerService) {
    super(repository, logger);
  }

  async create(
    createBlogTagDto: CreateBlogTagDto,
    userId: EntityId,
  ): Promise<BlogTag> {
    const createBlogTag = new BlogTag(createBlogTagDto);
    const blogTag = this.store(createBlogTag);
    return blogTag;
  }

  async findByBlogId(BlogId: EntityId): Promise<BlogTag[]> {
    return this.repository.find({ where: { blog_id: BlogId } });
  }

  async deleteBlogTag(
    BlogId: EntityId,
    TagId: EntityId,
  ): Promise<DeleteResult> {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .where('blog_id = :blog_id', {
        blog_id: BlogId,
      })
      .andWhere('tag_id = :tag_id', {
        tag_id: TagId,
      })
      .execute();
  }
}
