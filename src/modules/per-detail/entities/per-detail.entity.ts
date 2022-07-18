import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { Permission } from '../../permission/entities/permission.entity';

export enum ACTION {
  CREATE = 'CREATE',
  READ = 'READ',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export enum TABLE {
  BLOG = 'BLOG',
  TAG = 'TAG',
  USER = 'USER',
  CATEGORY = 'CATEGORY',
  PERMISSION = 'PERMISSION',
}
@Entity({ name: 'per_detail' })
export class PerDetail extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'per_id' })
  per_id: number;

  @ManyToOne(
    () => Permission,
    permission => permission.id,
  )
  @JoinColumn({ name: 'per_id' })
  permission: Permission;

  @Column({ name: 'action_name', type: 'enum', enum: ACTION })
  action: ACTION;

  @Column({ name: 'table_name', type: 'enum', enum: TABLE })
  table: TABLE;

  constructor(partial: Partial<PerDetail>) {
    super();
    Object.assign(this, partial);
  }
}
