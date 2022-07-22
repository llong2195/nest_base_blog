import { Injectable } from '@nestjs/common';
import { CreateCommentMDto } from './dto/create-comment-m.dto';
import { UpdateCommentMDto } from './dto/update-comment-m.dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { CommentM, CommentMDocument } from './entities/comment-m.entity';

@Injectable()
export class CommentMService {
  constructor(
    @InjectModel(CommentM.name) private commentModel: Model<CommentMDocument>,
  ) {}
  async create(createCommentMDto: CreateCommentMDto): Promise<any | CommentM> {
    const comment = await (
      await this.commentModel.create(createCommentMDto)
    ).toObject();
    return comment;
  }

  async findAll(): Promise<CommentM[]> {
    const comments = await this.commentModel
      .find({})
      .lean()
      .exec();
    return comments;
  }

  findOne(id: ObjectId): Promise<CommentM> {
    return this.commentModel
      .findById(id)
      .lean()
      .exec();
  }

  findChill(parentId: ObjectId): Promise<CommentM[]> {
    return this.commentModel
      .find()
      .lean()
      .exec();
  }

  update(id: ObjectId, updateCommentMDto: UpdateCommentMDto): Promise<any> {
    const updateComment = new this.commentModel(updateCommentMDto);
    return this.commentModel
      .findOneAndUpdate({ id: id }, updateComment)
      .lean()
      .exec();
  }

  async delete(id: ObjectId) {
    const delrs = await this.commentModel.findByIdAndDelete(id);
    console.log(delrs);

    return null;
  }
}
