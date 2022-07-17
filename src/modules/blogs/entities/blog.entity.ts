import { DateAudit } from 'src/base/date_audit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BlogLike } from '../../blog-like/entities/blog-like.entity';

@Entity({ name: 'blogs' })
export class Blog extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ default: '' })
  slug: string;

  @Column('text', { nullable: true })
  content: string;

  @Column('text', { nullable: true })
  bannerUrl: string;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(
    () => User,
    user => user.id,
    {
      onDelete: 'SET NULL',
      eager: true,
    },
  )
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(()=> BlogLike, bloglike => bloglike.blog)
  blog_like: BlogLike;

  
  constructor(partial: Partial<Blog>) {
    super();
    Object.assign(this, partial);
  }
}
