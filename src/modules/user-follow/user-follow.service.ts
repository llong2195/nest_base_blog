import { Injectable } from '@nestjs/common';
import { CreateUserFollowDto } from './dto/create-user-follow.dto';
import { UpdateUserFollowDto } from './dto/update-user-follow.dto';
import { BaseService } from '../../base/base.service';
import { UserFollow } from './entities/user-follow.entity';
import { LoggerService } from '../../logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';
import { UserFollowRepository } from './user-follow.repository';

@Injectable()
export class UserFollowService extends BaseService<
  UserFollow,
  UserFollowRepository
> {
  constructor(repository: UserFollowRepository, logger: LoggerService) {
    super(repository, logger);
  }
  async create(userId: EntityId, authId: EntityId): Promise<UserFollow> {
    const createUserFollow = new UserFollow(null);
    createUserFollow.user_id = <number>userId;
    createUserFollow.follower_id = <number>authId;
    const userFollow = this.store(createUserFollow);
    return userFollow;
  }
  async unfollow({
    user_id,
    follower_id,
  }: {
    user_id: EntityId;
    follower_id: EntityId;
  }) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .where('follower_id = :follower_id', { follower_id: follower_id })
      .andWhere('user_id = :user_id', { user_id: user_id })
      .execute();
  }
}
