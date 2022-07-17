import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogCatDto } from './dto/create-blog-cat.dto';
import { UpdateBlogCatDto } from './dto/update-blog-cat.dto';
import { BaseService } from '../../base/base.service';
import { LoggerService } from '../../logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';
import { BlogCat } from './entities/blog-cat.entity';
import { BlogCatRepository } from './blog-cat.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BlogCatService extends BaseService<BlogCat, BlogCatRepository> {
  [x: string]: any;
  constructor(repository: BlogCatRepository, logger: LoggerService) {
    super(repository, logger);
  }

  async create(
    createBlogCatDto: CreateBlogCatDto,
    userId: EntityId,
  ): Promise<BlogCat> {
    const createBlogCat = new BlogCat(createBlogCatDto);
    const blogCat = this.store(createBlogCat);
    return blogCat;
  }

  async findByBlogId(BlogId: EntityId): Promise<BlogCat[]> {
    return this.repository.find({ where: { blog_id: BlogId } });
  }

  async deleteBlogCat(
    BlogId: EntityId,
    CatId: EntityId,
  ): Promise<DeleteResult> {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .where('blog_id = :blog_id', {
        blog_id: BlogId,
      })
      .andWhere('cat_id = :cat_id', {
        cat_id: CatId,
      })
      .execute();
  }
}
