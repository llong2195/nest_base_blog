import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { LoggerService } from '../../logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm/index';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(repository: UserRepository, logger: LoggerService) {
    super(repository, logger);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email: email });
  }
  getUserMostFl(): Promise<User[]> {
    return this.repository
      .query(`SELECT * , count(*) as 'count' FROM nest_blog.users
      inner join user_follow on id = user_id
      group by follower_id
      order by count DESC`);
  }

  getInactiveUsers(): Promise<User[]> {
    return this.repository.getInactiveUsers();
  }

  async softDelete(id: EntityId): Promise<DeleteResult> {
    return this.repository.update(id, { deleted: true });
  }

  async restore(id: EntityId): Promise<User> {
    await this.repository.update(id, { deleted: false });
    return this.findById(id);
  }
}
