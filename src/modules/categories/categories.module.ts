import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHttpModule } from '../users/user-http.module';
import { CategoryRepository } from './category.repository';
import { CategorySubscriber } from './subscriber/tag.subscriber';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategorySubscriber],
  imports: [TypeOrmModule.forFeature([CategoryRepository]), UserHttpModule],
})
export class CategoriesModule {}
