import { Module } from '@nestjs/common'
import { BlogsService } from './blogs.service'
import { BlogsController } from './blogs.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BlogRepository } from './blog.repository'

@Module({
  controllers: [BlogsController],
  imports: [TypeOrmModule.forFeature([BlogRepository])],
  providers: [BlogsService],
  exports: [TypeOrmModule],
})
export class BlogsModule {}
