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
import { BlogCatService } from './blog-cat.service';
import { CreateBlogCatDto } from './dto/create-blog-cat.dto';
import { UpdateBlogCatDto } from './dto/update-blog-cat.dto';
import { BaseResponseDto, AuthUserDto } from '../../base/base.dto';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogCat } from './entities/blog-cat.entity';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Controller('blog-cat')
@UseGuards(JwtAuthGuard)
export class BlogCatController {
  constructor(private readonly blogCatService: BlogCatService) {}

  @Post()
  async create(
    @Body() createBlogCatDto: CreateBlogCatDto,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<BlogCat>> {
    const blogCat = await this.blogCatService.create(
      createBlogCatDto,
      authUser.id,
    );
    return new BaseResponseDto<BlogCat>('Success', blogCat);
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<BlogCat[]>> {
    const blogCats = await this.blogCatService.index();
    return new BaseResponseDto<BlogCat[]>('Success', blogCats);
  }

  @Get('/:BlogId')
  async findOne(
    @Param('BlogId') BlogId: EntityId,
  ): Promise<BaseResponseDto<BlogCat[]>> {
    const blogCat = await this.blogCatService.findByBlogId(BlogId);
    return new BaseResponseDto<BlogCat[]>(
      'Success',
      plainToClass(BlogCat, blogCat),
    );
  }

  @Delete('/:BlogId/:CatId')
  async remove(
    @Param('BlogId') BlogId: EntityId,
    @Param('CatId') CatId: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.blogCatService.deleteBlogCat(BlogId, CatId);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
