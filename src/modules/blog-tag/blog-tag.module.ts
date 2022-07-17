import { Module } from '@nestjs/common';
import { BlogTagService } from './blog-tag.service';
import { BlogTagController } from './blog-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTagRepository } from './blog-tag.repository';

@Module({
  controllers: [BlogTagController],
  providers: [BlogTagService],
  imports: [TypeOrmModule.forFeature([BlogTagRepository])],
  exports: [TypeOrmModule],
})
export class BlogTagModule {}
