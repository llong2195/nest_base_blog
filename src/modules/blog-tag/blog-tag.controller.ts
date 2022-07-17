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
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { BlogTagService } from './blog-tag.service';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog-tag.dto';
import { AuthUserDto, BaseResponseDto } from '../../base/base.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogTag } from './entities/blog-tag.entity';
import { EntityId } from 'typeorm/repository/EntityId';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';

@Controller('blog-tag')
@UseGuards(JwtAuthGuard)
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  @Post()
  async create(
    @Body() createBlogTagDto: CreateBlogTagDto,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<BlogTag>> {
    const blogTag = await this.blogTagService.create(
      createBlogTagDto,
      authUser.id,
    );
    return new BaseResponseDto<BlogTag>('Success', blogTag);
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<BlogTag[]>> {
    const blogTags = await this.blogTagService.index();
    return new BaseResponseDto<BlogTag[]>('Success', blogTags);
  }

  @Get('/:BlogId')
  async findOne(
    @Param('BlogId') BlogId: EntityId,
  ): Promise<BaseResponseDto<BlogTag[]>> {
    const blogTag = await this.blogTagService.findByBlogId(BlogId);
    return new BaseResponseDto<BlogTag[]>(
      'Success',
      plainToClass(BlogTag, blogTag),
    );
  }

  @Delete('/:BlogId/:TagId')
  async remove(
    @Param('BlogId') BlogId: EntityId,
    @Param('TagId') TagId: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.blogTagService.deleteBlogTag(BlogId, TagId);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
