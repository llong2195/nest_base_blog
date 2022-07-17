import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogCatDto } from './create-blog-cat.dto';

export class UpdateBlogCatDto extends PartialType(CreateBlogCatDto) {}
