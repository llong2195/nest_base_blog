import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tags' })
export class Tag extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  slug: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @ManyToOne(
    () => User,
    user => user.id,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user?: User;

  constructor(partial: Partial<Tag>) {
    super();
    Object.assign(this, partial);
  }
}
