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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BaseResponseDto } from 'src/base/base.dto';
import { Comment } from './entities/comment.entity';
import { plainToClass } from 'class-transformer';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { AuthUserDto } from '../../base/base.dto';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';

@Controller('comment')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<Comment>> {
    const comment = await this.commentService.create(
      createCommentDto,
      authUser.id,
    );
    return new BaseResponseDto<Comment>(
      'Success',
      plainToClass(Comment, comment),
    );
  }

  @Get()
  async index(): Promise<BaseResponseDto<Comment[]>> {
    const comments = await this.commentService.index();
    return new BaseResponseDto<Comment[]>(
      'Success',
      plainToClass(Comment, comments),
    );
  }

  @Get('/inactive')
  async findAll(): Promise<BaseResponseDto<Comment[]>> {
    const comments = await this.commentService.getInactiveComments();
    return new BaseResponseDto<Comment[]>(
      'Success',
      plainToClass(Comment, comments),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: EntityId): Promise<BaseResponseDto<Comment>> {
    const tag = await this.commentService.findById(id);
    return new BaseResponseDto<Comment>('Success', plainToClass(Comment, tag));
  }

  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<BaseResponseDto<Comment>> {
    const tag = await this.commentService.upgrade(id, updateCommentDto);
    return new BaseResponseDto<Comment>('Success', plainToClass(Comment, tag));
  }

  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.commentService.softDelete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: EntityId): Promise<BaseResponseDto<Comment>> {
    const tag = await this.commentService.restore(id);
    return new BaseResponseDto<Comment>('Success', tag);
  }

  @Delete(':id/destroy')
  async destroy(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.commentService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
