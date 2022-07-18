import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthUserDto, BaseResponseDto } from 'src/base/base.dto';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './entities/blog.entity';
import { plainToClass } from 'class-transformer';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/entities/comment.entity';
import { RBACGuard } from '../auth/guards/rbac.guard';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { TABLE, ACTION } from '../per-detail/entities/per-detail.entity';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.CREATE })
  @Post()
  async create(
    @AuthUser() authUser: AuthUserDto,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<BaseResponseDto<Blog>> {
    const blog = await this.blogsService.create(createBlogDto, authUser.id);
    return new BaseResponseDto<Blog>('Success', blog);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Get()
  async index(): Promise<BaseResponseDto<Blog[]>> {
    const blogs = await this.blogsService.index();
    return new BaseResponseDto<Blog[]>('Success', blogs);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Get('/inactive')
  async findAll(): Promise<BaseResponseDto<Blog[]>> {
    const blogs = await this.blogsService.getInactiveBlogs();
    return new BaseResponseDto<Blog[]>('Success', plainToClass(Blog, blogs));
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Get('/hot')
  async findBlogHot(): Promise<BaseResponseDto<Blog[]>> {
    const blogs = await this.blogsService.getBlogsHot();
    return new BaseResponseDto<Blog[]>('Success', plainToClass(Blog, blogs));
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Get('/search')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async search(@Query() query): Promise<BaseResponseDto<Blog[]>> {
    const blogs = await this.blogsService.search(query);
    return new BaseResponseDto<Blog[]>('Success', plainToClass(Blog, blogs));
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Get(':id')
  async findOne(@Param('id') id: EntityId): Promise<BaseResponseDto<Blog>> {
    const blog = await this.blogsService.findById(id);
    return new BaseResponseDto<Blog>('Success', plainToClass(Blog, blog));
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Get(':id/comment')
  async findComment(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<Comment[]>> {
    const comments = await this.commentService.getByBlogId(id);
    return new BaseResponseDto<Comment[]>(
      'Success',
      plainToClass(Comment, comments),
    );
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.EDIT })
  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<BaseResponseDto<Blog>> {
    const blog = await this.blogsService.upgrade(id, updateBlogDto);
    return new BaseResponseDto<Blog>('Success', plainToClass(Blog, blog));
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.CREATE })
  @Post(':id/like')
  async like(
    @Param('id') id: EntityId,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<Blog>> {
    const blog = await this.blogsService.like(id, authUser.id);
    return new BaseResponseDto<Blog>('Success', plainToClass(Blog, blog));
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Post(':id/unlike')
  async unlike(
    @Param('id') id: EntityId,
    @AuthUser() authUser: AuthUserDto,
  ): Promise<BaseResponseDto<Blog>> {
    const blog = await this.blogsService.unlike(id, authUser.id);
    return new BaseResponseDto<Blog>('Success', plainToClass(Blog, blog));
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.READ })
  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.blogsService.softDelete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.DELETE })
  @Patch(':id/setPublic')
  async setPublic(@Param('id') id: EntityId): Promise<BaseResponseDto<Blog>> {
    const blog = await this.blogsService.setPublic(id);
    return new BaseResponseDto<Blog>('Success', blog);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.EDIT })
  @Patch(':id/restore')
  async restore(@Param('id') id: EntityId): Promise<BaseResponseDto<Blog>> {
    const category = await this.blogsService.restore(id);
    return new BaseResponseDto<Blog>('Success', category);
  }

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.BLOG, action: ACTION.DELETE })
  @Delete(':id/destroy')
  async destroy(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.blogsService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
