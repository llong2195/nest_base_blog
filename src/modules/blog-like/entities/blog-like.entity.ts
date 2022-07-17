import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { Blog } from '../../blogs/entities/blog.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'blog_like' })
export class BlogLike extends DateAudit {
  @PrimaryColumn({ name: 'blog_id' })
  blog_id: number;

  @PrimaryColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(
    () => Blog,
    blog => blog.id,
  )
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne(
    () => User,
    User => User.id,
  )
  @JoinColumn({ name: 'user_id' })
  User: User;

  constructor(partial: Partial<BlogLike>) {
    super();
    Object.assign(this, partial);
  }
}
