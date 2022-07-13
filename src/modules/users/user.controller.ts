import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { EntityId } from 'typeorm/repository/EntityId'
import { plainToClass } from 'class-transformer'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteResult } from 'typeorm/index'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { BaseResponseDto } from 'src/base/base.dto'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(): Promise<BaseResponseDto<User[]>> {
    const users = await this.userService.index()
    return new BaseResponseDto<User[]>('Success', users)
  }

  @Get('/inactive')
  async getInactiveUser(): Promise<BaseResponseDto<User[]>> {
    const users = await this.userService.getInactiveUsers()
    return new BaseResponseDto<User[]>('Success', users)
  }

  @Get('/:id')
  async show(@Param('id') id: EntityId): Promise<BaseResponseDto<User>> {
    const user = await this.userService.findById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return new BaseResponseDto<User>('Success', user)
  }

  @Post()
  async create(
    @Body() userData: CreateUserDto,
  ): Promise<BaseResponseDto<User>> {
    const createdUser = await this.userService.store(userData)
    return new BaseResponseDto<User>('Success', plainToClass(User, createdUser))
  }

  @Put('/:id')
  async update(
    @Param('id') id: EntityId,
    @Body() userData: UpdateUserDto,
  ): Promise<BaseResponseDto<User>> {
    const createdUser = this.userService.update(id, userData)
    return new BaseResponseDto<User>('Success', plainToClass(User, createdUser))
  }

  @Delete('/:id')
  async destroy(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.userService.delete(id)
    return new BaseResponseDto<DeleteResult>('Success', null)
  }
}
