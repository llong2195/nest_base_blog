import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Category } from '../../categories/entities/category.entity';

export class CreateBlogDto {
  @IsNotEmpty({ message: 'name is not empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'content is not empty' })
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  bannerUrl: string;

  @IsOptional()
  @IsNotEmpty()
  tag_id: Tag[];

  @IsOptional()
  @IsNotEmpty()
  cat_id: Category[];
}
