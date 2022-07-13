import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../users/user.service'
import { User } from '../users/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { BaseResponseDto } from 'src/base/base.dto'
import { LoginRequestDto } from './dto/login-request.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Username is incorrect')
    }
    const compareResult = await bcrypt.compare(password, user.password)
    if (!compareResult) {
      throw new UnauthorizedException('Password is incorrect')
    }
    return user
  }

  async login(request: LoginRequestDto): Promise<string> {
    const user = await this.userService.findByEmail(request.email)
    const payload = {
      email: user.email,
      id: user.id,
    }
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('jwtExpiresIn'),
    })

    return token
  }
}
