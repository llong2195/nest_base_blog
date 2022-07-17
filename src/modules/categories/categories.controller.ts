import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseResponseDto, AuthUserDto } from '../../base/base.dto';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm/index';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { Category } from './entities/category.entity';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<Category>> {
    const tag = await this.categoriesService.create(
      createCategoryDto,
      authUser.id,
    );
    return new BaseResponseDto<Category>(
      'Success',
      plainToClass(Category, tag),
    );
  }

  @Get()
  async index(): Promise<BaseResponseDto<Category[]>> {
    const categories = await this.categoriesService.index();
    return new BaseResponseDto<Category[]>(
      'Success',
      plainToClass(Category, categories),
    );
  }

  @Get('/inactive')
  async findAll(): Promise<BaseResponseDto<Category[]>> {
    const categories = await this.categoriesService.getInactiveCategories();
    return new BaseResponseDto<Category[]>(
      'Success',
      plainToClass(Category, categories),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: EntityId): Promise<BaseResponseDto<Category>> {
    const category = await this.categoriesService.findById(id);
    return new BaseResponseDto<Category>(
      'Success',
      plainToClass(Category, category),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() UpdateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResponseDto<Category>> {
    const category = await this.categoriesService.upgrade(
      id,
      UpdateCategoryDto,
    );
    return new BaseResponseDto<Category>(
      'Success',
      plainToClass(Category, category),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.categoriesService.softDelete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: EntityId): Promise<BaseResponseDto<Category>> {
    const category = await this.categoriesService.restore(id);
    return new BaseResponseDto<Category>('Success', category);
  }

  @Delete(':id/destroy')
  async destroy(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.categoriesService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
