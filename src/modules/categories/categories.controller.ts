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
import { RBACGuard } from '../auth/guards/rbac.guard';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { TABLE, ACTION } from '../per-detail/entities/per-detail.entity';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.CREATE })
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

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.READ })
  @Get()
  async index(): Promise<BaseResponseDto<Category[]>> {
    const categories = await this.categoriesService.index();
    return new BaseResponseDto<Category[]>(
      'Success',
      plainToClass(Category, categories),
    );
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.READ })
  @Get('/inactive')
  async findAll(): Promise<BaseResponseDto<Category[]>> {
    const categories = await this.categoriesService.getInactiveCategories();
    return new BaseResponseDto<Category[]>(
      'Success',
      plainToClass(Category, categories),
    );
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.READ })
  @Get(':id')
  async findOne(@Param('id') id: EntityId): Promise<BaseResponseDto<Category>> {
    const category = await this.categoriesService.findById(id);
    return new BaseResponseDto<Category>(
      'Success',
      plainToClass(Category, category),
    );
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.EDIT })
  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResponseDto<Category>> {
    const category = await this.categoriesService.upgrade(
      id,
      updateCategoryDto,
    );
    return new BaseResponseDto<Category>(
      'Success',
      plainToClass(Category, category),
    );
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.DELETE })
  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.categoriesService.softDelete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.EDIT })
  @Patch(':id/restore')
  async restore(@Param('id') id: EntityId): Promise<BaseResponseDto<Category>> {
    const category = await this.categoriesService.restore(id);
    return new BaseResponseDto<Category>('Success', category);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.CATEGORY, action: ACTION.DELETE })
  @Delete(':id/destroy')
  async destroy(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.categoriesService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
