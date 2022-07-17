import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { Blog } from '../../blogs/entities/blog.entity';
import { Tag } from '../../tags/entities/tag.entity';
@Entity({ name: 'blog_tag' })
export class BlogTag extends DateAudit {
  @PrimaryColumn({ name: 'blog_id' })
  blog_id: number;

  @PrimaryColumn({ name: 'tag_id' })
  tag_id: number;

  @ManyToOne(
    () => Blog,
    blog => blog.id,
  )
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne(
    () => Tag,
    tag => tag.id,
  )
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  constructor(partial: Partial<BlogTag>) {
    super();
    Object.assign(this, partial);
  }
}
