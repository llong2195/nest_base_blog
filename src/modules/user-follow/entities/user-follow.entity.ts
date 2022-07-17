import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DateAudit } from '../../../base/date_audit.entity';
import { User } from '../../users/entities/user.entity';
@Entity({name: 'user_follow'})
export class UserFollow extends DateAudit {

  @PrimaryColumn({ name: 'user_id' })
  user_id: number;

  @PrimaryColumn({ name: 'follower_id' })
  follower_id: number;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'user_id' })
  user?: User;
  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'follower_id' })
  follower?: User;

  constructor(partial: Partial<UserFollow>) {
    super();
    Object.assign(this, partial);
  }
}
