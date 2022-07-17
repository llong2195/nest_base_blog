import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { Blog } from '../../blogs/entities/blog.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'blog_cat' })
export class BlogCat extends DateAudit {
  @PrimaryColumn({ name: 'blog_id' })
  blog_id: number;

  @PrimaryColumn({ name: 'cat_id' })
  cat_id: number;

  @ManyToOne(
    () => Blog,
    blog => blog.id,
  )
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne(
    () => Category,
    category => category.id,
  )
  @JoinColumn({ name: 'cat_id' })
  category: Category;

  constructor(partial: Partial<BlogCat>) {
    super();
    Object.assign(this, partial);
  }
}
