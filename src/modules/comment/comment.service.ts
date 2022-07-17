import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BaseService } from '../../base/base.service';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comment.repository';
import { LoggerService } from '../../logger/custom.logger';
import { UserService } from '../users/user.service';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';

@Injectable()
export class CommentService extends BaseService<Comment, CommentRepository> {
  constructor(
    repository: CommentRepository,
    logger: LoggerService,
    private userService: UserService,
  ) {
    super(repository, logger);
  }

  getInactiveComments(): Promise<Comment[]> {
    return this.repository.find({ where: { deleted: false } });
  }

  getByBlogId(blogId: EntityId): Promise<Comment[]> {
    return this.repository.find({ where: { blog_id: blogId } });
  }

  async create(
    createCommentDto: CreateCommentDto,
    userId: EntityId,
  ): Promise<Comment> {
    const createComment = new Comment(createCommentDto);
    createComment.user_id = <number>userId;
    const comment = this.store(createComment);
    return comment;
  }

  async upgrade(
    id: EntityId,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const Comment = this.update(id, updateCommentDto);
    return Comment;
  }

  async softDelete(id: EntityId): Promise<DeleteResult> {
    return this.repository.update(id, { deleted: true });
  }

  async restore(id: EntityId): Promise<Comment> {
    await this.repository.update(id, { deleted: false });
    return this.findById(id);
  }
}
