import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { User } from '../users/entities/user.entity'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { UserService } from '../users/user.service'
import { AuthUser } from '../../decorators/auth.user.decorator'
import { AuthUserDto, BaseResponseDto } from 'src/base/base.dto'
import { LoginRequestDto } from './dto/login-request.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() request: LoginRequestDto,
  ): Promise<BaseResponseDto<string>> {
    const token = await this.authService.login(request)
    return new BaseResponseDto<string>('Success', token)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-profile')
  async myProfile(
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<User>> {
    const user = await this.userService.findById(authUser.id)
    return new BaseResponseDto<User>('Success', plainToClass(User, user))
  }
}
