import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityId } from 'typeorm/repository/EntityId';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult } from 'typeorm/index';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BaseResponseDto } from 'src/base/base.dto';
import { ACTION, TABLE } from '../per-detail/entities/per-detail.entity';
import { RBACGuard } from '../auth/guards/rbac.guard';
import { RBAC } from '../auth/decorator/rbac.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.READ })
  @Get()
  async index(): Promise<BaseResponseDto<User[]>> {
    const users = await this.userService.index();
    return new BaseResponseDto<User[]>('Success', users);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.READ })
  @Get('/inactive')
  async getInactiveUser(): Promise<BaseResponseDto<User[]>> {
    const users = await this.userService.getInactiveUsers();
    return new BaseResponseDto<User[]>('Success', users);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.READ })
  @Get('/hot')
  async getUserHot(): Promise<BaseResponseDto<User[]>> {
    const users = await this.userService.getUserMostFl();
    return new BaseResponseDto<User[]>('Success', users);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.READ })
  @Get('/:id')
  async show(@Param('id') id: EntityId): Promise<BaseResponseDto<User>> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return new BaseResponseDto<User>('Success', user);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.CREATE })
  @Post()
  async create(
    @Body() userData: CreateUserDto,
  ): Promise<BaseResponseDto<User>> {
    const createdUser = await this.userService.store(userData);
    return new BaseResponseDto<User>(
      'Success',
      plainToClass(User, createdUser),
    );
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.EDIT })
  @Patch('/:id')
  async update(
    @Param('id') id: EntityId,
    @Body() userData: UpdateUserDto,
  ): Promise<BaseResponseDto<User>> {
    const createdUser = this.userService.update(id, userData);
    return new BaseResponseDto<User>(
      'Success',
      plainToClass(User, createdUser),
    );
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.DELETE })
  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.userService.softDelete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.DELETE })
  @Patch(':id/restore')
  async restore(@Param('id') id: EntityId): Promise<BaseResponseDto<User>> {
    const user = await this.userService.restore(id);
    return new BaseResponseDto<User>('Success', user);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.USER, action: ACTION.DELETE })
  @Delete(':id/destroy')
  async destroy(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.userService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
