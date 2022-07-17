import { Module } from '@nestjs/common';
import { BlogCatService } from './blog-cat.service';
import { BlogCatController } from './blog-cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCatRepository } from './blog-cat.repository';

@Module({
  controllers: [BlogCatController],
  providers: [BlogCatService],
  imports: [TypeOrmModule.forFeature([BlogCatRepository])],
  exports: [TypeOrmModule],
})
export class BlogCatModule {}
