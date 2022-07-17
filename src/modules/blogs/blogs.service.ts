import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { LoggerService } from 'src/logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './entities/blog.entity';
import { DeleteResult } from 'typeorm';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogLikeService } from '../blog-like/blog-like.service';

@Injectable()
export class BlogsService extends BaseService<Blog, BlogRepository> {
  constructor(
    repository: BlogRepository,
    logger: LoggerService,
    private blogLikeService: BlogLikeService,
  ) {
    super(repository, logger);
  }

  getInactiveBlogs(): Promise<Blog[]> {
    return this.repository.find({ where: { deleted: false, isPublic: true } });
  }

  getBlogsHot(): Promise<Blog[]> {
    return this.repository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.blog_like', 'blog_id')
      .where('blog.deleted = false and isPublic = true')
      .getMany();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async search(query: any): Promise<Blog[]> {
    const option = {
      limit: 5,
      page: 1,
      name: '',
    };
    if ('page' in query) {
      option.page = query.page;
    }
    if ('limit' in query) {
      option.limit = query.limit;
    }
    if ('name' in query) {
      option.name = query.name;
    }

    const skip = option.limit * (option.page - 1) || 0;
    return this.repository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.blog_like', 'blog_id')
      .where('blog.deleted = false and isPublic = true')
      .andWhere('blog.content like :name', { name: `%${option.name}%` })
      .limit(option.limit)
      .take(skip)
      .getMany();
  }

  async like(id: EntityId, userId: number) {
    return await this.blogLikeService.create({
      blog_id: <number>id,
      user_id: userId,
    });
  }
  async unlike(id: EntityId, userId: number) {
    return await this.blogLikeService.unlike({
      blog_id: <number>id,
      user_id: userId,
    });
  }

  async create(
    createBlogDto: CreateBlogDto,
    userId: number,
  ): Promise<Blog | undefined> {
    const createBlog = new Blog(createBlogDto);
    createBlog.user_id = userId;
    const blog = await this.store(createBlog);
    const BlogCat = createBlogDto.cat_id;
    const BlogTag = createBlogDto.tag_id;
    console.log(BlogCat);
    console.log(BlogTag);

    return blog;
  }

  async upgrade(id: EntityId, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const Blog = this.update(id, updateBlogDto);
    return Blog;
  }

  async softDelete(id: EntityId): Promise<DeleteResult> {
    return this.repository.update(id, { deleted: true });
  }

  async setPublic(id: EntityId): Promise<Blog> {
    await this.repository.update(id, { isPublic: true });
    return this.findById(id);
  }

  async restore(id: EntityId): Promise<Blog> {
    await this.repository.update(id, { deleted: false });
    return this.findById(id);
  }
}
