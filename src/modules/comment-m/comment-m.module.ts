import { Module } from '@nestjs/common';
import { CommentMService } from './comment-m.service';
import { CommentMController } from './comment-m.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentM, CommentMSchema } from './entities/comment-m.entity';

@Module({
  controllers: [CommentMController],
  providers: [CommentMService],
  imports: [
    MongooseModule.forFeature([
      { name: CommentM.name, schema: CommentMSchema, collection: 'comments' },
    ]),
  ],
})
export class CommentMModule {}
