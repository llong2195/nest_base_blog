import { Module } from '@nestjs/common';
import { UserFollowService } from './user-follow.service';
import { UserFollowController } from './user-follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollowRepository } from './user-follow.repository';

@Module({
  controllers: [UserFollowController],
  providers: [UserFollowService],
  imports: [TypeOrmModule.forFeature([UserFollowRepository])],
  exports: [TypeOrmModule, UserFollowService],
})
export class UserFollowModule {}
