import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentMDto } from './create-comment-m.dto';

export class UpdateCommentMDto extends PartialType(CreateCommentMDto) {}
