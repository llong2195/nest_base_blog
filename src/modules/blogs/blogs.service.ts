import { Injectable } from '@nestjs/common'
import { BaseService } from 'src/base/base.service'
import { LoggerService } from 'src/logger/custom.logger'
import { BlogRepository } from './blog.repository'
import { CreateBlogDto } from './dto/create-blog.dto'
import { Blog } from './entities/blog.entity'

@Injectable()
export class BlogsService extends BaseService<Blog, BlogRepository> {
  constructor(repository: BlogRepository, logger: LoggerService) {
    super(repository, logger)
  }
  async create(
    createBlogDto: CreateBlogDto,
    userId: number,
  ): Promise<Blog | undefined> {
    const blog = this.store({
      userId,
      content: createBlogDto.content,
    })
    return blog
  }
}
