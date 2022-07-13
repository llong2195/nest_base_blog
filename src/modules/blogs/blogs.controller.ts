import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { AuthUserDto, BaseResponseDto } from 'src/base/base.dto'
import { AuthUser } from 'src/decorators/auth.user.decorator'
import { BlogsService } from './blogs.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { Blog } from './entities/blog.entity'

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(
    @AuthUser() authUser: AuthUserDto,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<BaseResponseDto<Blog>> {
    const blog = await this.blogsService.create(createBlogDto, authUser.id)
    return new BaseResponseDto<Blog>('Success', blog)
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<Blog[]>> {
    const blogs = await this.blogsService.index()
    return new BaseResponseDto<Blog[]>('Success', blogs)
  }
}
