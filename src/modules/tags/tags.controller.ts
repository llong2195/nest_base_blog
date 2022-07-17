import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { BaseResponseDto, AuthUserDto } from '../../base/base.dto';
import { Tag } from './entities/tag.entity';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm/index';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { plainToClass } from 'class-transformer';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(
    @Body() createTagDto: CreateTagDto,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<Tag>> {
    const tag = await this.tagsService.create(createTagDto, authUser.id);
    return new BaseResponseDto<Tag>('Success', plainToClass(Tag, tag));
  }

  @Get()
  async index(): Promise<BaseResponseDto<Tag[]>> {
    const tags = await this.tagsService.index();
    return new BaseResponseDto<Tag[]>('Success', plainToClass(Tag, tags));
  }

  @Get('/inactive')
  async findAll(): Promise<BaseResponseDto<Tag[]>> {
    const tags = await this.tagsService.getInactiveTags();
    return new BaseResponseDto<Tag[]>('Success', plainToClass(Tag, tags));
  }

  @Get(':id')
  async findOne(@Param('id') id: EntityId): Promise<BaseResponseDto<Tag>> {
    const tag = await this.tagsService.findById(id);
    return new BaseResponseDto<Tag>('Success', plainToClass(Tag, tag));
  }

  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<BaseResponseDto<Tag>> {
    const tag = await this.tagsService.upgrade(id, updateTagDto);
    return new BaseResponseDto<Tag>('Success', plainToClass(Tag, tag));
  }

  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.tagsService.softDelete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: EntityId): Promise<BaseResponseDto<Tag>> {
    const tag = await this.tagsService.restore(id);
    return new BaseResponseDto<Tag>('Success', tag);
  }

  @Delete(':id/destroy')
  async destroy(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.tagsService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
