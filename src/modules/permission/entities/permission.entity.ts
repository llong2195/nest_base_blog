import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { PerDetail } from '../../per-detail/entities/per-detail.entity';

@Entity({ name: 'permission' })
export class Permission extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(
    () => PerDetail,
    perdetail => perdetail.permission,
    {
      eager: true,
    },
  )
  perdetails: PerDetail[];

  constructor(partial: Partial<Permission>) {
    super();
    Object.assign(this, partial);
  }
}
