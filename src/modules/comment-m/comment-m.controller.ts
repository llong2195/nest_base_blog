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
import { CommentMService } from './comment-m.service';
import { CreateCommentMDto } from './dto/create-comment-m.dto';
import { UpdateCommentMDto } from './dto/update-comment-m.dto';
import { BaseResponseDto } from '../../base/base.dto';
import { CommentM } from './entities/comment-m.entity';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ObjectId } from 'mongoose';

@Controller('comment-m')
@UseGuards(JwtAuthGuard)
export class CommentMController {
  constructor(private readonly commentMService: CommentMService) {}

  @Post()
  async create(
    @Body() createCommentMDto: CreateCommentMDto,
  ): Promise<BaseResponseDto<CommentM>> {
    const comment = await this.commentMService.create(createCommentMDto);
    console.log(comment);

    return new BaseResponseDto<any>('Success', plainToClass(CommentM, comment));
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<CommentM[]>> {
    const comments = await this.commentMService.findAll();
    console.log(comments);

    return new BaseResponseDto<CommentM[]>(
      'Success',
      plainToClass(CommentM, comments),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<BaseResponseDto<CommentM>> {
    const comment = await this.commentMService.findOne(id);
    return new BaseResponseDto<CommentM>(
      'Success',
      plainToClass(CommentM, comment),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateCommentMDto: UpdateCommentMDto,
  ): Promise<BaseResponseDto<CommentM>> {
    const comment = await this.commentMService.update(id, updateCommentMDto);
    return new BaseResponseDto<CommentM>(
      'Success',
      plainToClass(CommentM, comment),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId): Promise<BaseResponseDto<CommentM>> {
    await this.commentMService.delete(id);
    return new BaseResponseDto<CommentM>('Success', null);
  }
}
