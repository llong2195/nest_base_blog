import { EntityRepository, Repository } from 'typeorm';
import { UserFollow } from './entities/user-follow.entity';

@EntityRepository(UserFollow)
export class UserFollowRepository extends Repository<UserFollow> {}
