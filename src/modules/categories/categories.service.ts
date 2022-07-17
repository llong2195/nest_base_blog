import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { LoggerService } from '../../logger/custom.logger';
import { UserService } from '../users/user.service';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm/index';

@Injectable()
export class CategoriesService extends BaseService<
  Category,
  CategoryRepository
> {
  constructor(
    repository: CategoryRepository,
    logger: LoggerService,
    private userService: UserService,
  ) {
    super(repository, logger);
  }

  getInactiveCategories(): Promise<Category[]> {
    return this.repository.find({ where: { deleted: false } });
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: EntityId,
  ): Promise<Category> {
    const exits = await this.repository.findOne({
      where: { name: createCategoryDto.name },
    });
    if (exits) {
      throw new HttpException(
        `'${createCategoryDto.name}' is Duplicate`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createCategory = new Category(createCategoryDto);
    createCategory.user_id = <number>userId;
    const category = this.store(createCategory);
    return category;
  }

  async upgrade(
    id: EntityId,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const exits = await this.repository.findOne({
      where: { name: updateCategoryDto.name },
    });
    if (exits) {
      throw new HttpException(
        `'${updateCategoryDto.name}' is Duplicate`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = this.update(id, updateCategoryDto);
    return category;
  }

  async softDelete(id: EntityId): Promise<DeleteResult> {
    return this.repository.update(id, { deleted: true });
  }

  async restore(id: EntityId): Promise<Category> {
    await this.repository.update(id, { deleted: false });
    return this.findById(id);
  }
}
