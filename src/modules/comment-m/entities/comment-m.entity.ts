import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export type CommentMDocument = CommentM & Document;

@Schema({ timestamps: true })
export class CommentM {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id : string;
  
  @Prop()
  context: string;

  @Prop()
  blog_id: number;

  @Prop()
  user_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CommentM.name })
  parent: CommentM;
}

export const CommentMSchema = SchemaFactory.createForClass(CommentM);
