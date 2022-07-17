import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserFollowService } from './user-follow.service';
import { CreateUserFollowDto } from './dto/create-user-follow.dto';
import { UpdateUserFollowDto } from './dto/update-user-follow.dto';
import { EntityId } from 'typeorm/repository/EntityId';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { AuthUserDto, BaseResponseDto } from '../../base/base.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserFollow } from './entities/user-follow.entity';

@Controller('user-follow')
@UseGuards(JwtAuthGuard)
export class UserFollowController {
  constructor(private readonly userFollowService: UserFollowService) {}

  @Post(':id')
  async follow(
    @Param('id') id: EntityId,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<UserFollow>> {
    const userFollow = await this.userFollowService.create(id, authUser.id);
    return new BaseResponseDto<UserFollow>('Success', userFollow);
  }

  @Post(':id')
  async unfollow(@Param('id') id: EntityId, @AuthUser() authUser: AuthUserDto) {
    await this.userFollowService.unfollow({ user_id: id, follower_id: id });
    return new BaseResponseDto<UserFollow>('Success', null);
  }
}
