import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { DateAudit } from 'src/base/date_audit.entity';
import { UserFollow } from '../../user-follow/entities/user-follow.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity({ name: 'users' })
export class User extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['email'])
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'per_id', default: '4' })
  per_id: number;

  @OneToMany(
    () => Permission,
    permission => permission.id,
  )
  permission: Permission[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => UserFollow,
    UserFollow => UserFollow.follower_id,
  )
  userFollow: UserFollow;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
