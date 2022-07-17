import { EntityRepository, Repository } from 'typeorm';
import { BlogCat } from './entities/blog-cat.entity';

@EntityRepository(BlogCat)
export class BlogCatRepository extends Repository<BlogCat> {}
