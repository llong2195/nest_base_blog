import { Module } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeController } from './blog-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogLikeRepository } from './blog-like.repository';

@Module({
  controllers: [BlogLikeController],
  providers: [BlogLikeService],
  imports: [TypeOrmModule.forFeature([BlogLikeRepository])],
  exports: [TypeOrmModule, BlogLikeService],
})
export class BlogLikeModule {}
