import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from '../../blogs/entities/blog.entity';
import { User } from '../../users/entities/user.entity';
import { DateAudit } from '../../../base/date_audit.entity';

@Entity({name: 'comment'})
export class Comment extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  context: string;

  @Column({ name: 'blog_id' })
  blog_id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(
    () => Blog,
    blog => blog.id,
  )
  @JoinColumn({name: 'blog_id'})
  blog?: Blog;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({name: 'user_id'})
  user?: User;

  constructor(partial: Partial<Comment>) {
    super();
    Object.assign(this, partial);
  }
}
