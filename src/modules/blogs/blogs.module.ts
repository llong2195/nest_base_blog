import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { BlogSubscriber } from './subscriber/blog.subscriber';
import { BlogLikeModule } from '../blog-like/blog-like.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  controllers: [BlogsController],
  imports: [
    TypeOrmModule.forFeature([BlogRepository]),
    BlogLikeModule,
    CommentModule,
  ],
  providers: [BlogsService, BlogSubscriber],
  exports: [TypeOrmModule],
})
export class BlogsModule {}
