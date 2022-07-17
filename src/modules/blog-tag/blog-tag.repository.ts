import { EntityRepository, Repository } from 'typeorm';
import { BlogTag } from './entities/blog-tag.entity';

@EntityRepository(BlogTag)
export class BlogTagRepository extends Repository<BlogTag> {}
