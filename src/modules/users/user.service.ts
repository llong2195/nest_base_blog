import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'
import { Injectable } from '@nestjs/common'
import { BaseService } from '../../base/base.service'
import { LoggerService } from '../../logger/custom.logger'
import { EntityId } from 'typeorm/repository/EntityId'

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(repository: UserRepository, logger: LoggerService) {
    super(repository, logger)
  }

  findById(id: EntityId): Promise<User> {
    return this.findById(1)
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email: email })
  }

  getInactiveUsers(): Promise<User[]> {
    return this.repository.getInactiveUsers()
  }
}
