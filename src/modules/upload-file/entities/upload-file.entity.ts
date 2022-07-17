import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { User } from '../../users/entities/user.entity';
@Entity({ name: 'upload_files' })
export class UploadFile extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  url: string;

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

  constructor(partial: Partial<UploadFile>) {
    super();
    Object.assign(this, partial);
  }
}
