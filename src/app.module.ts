import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';

import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import authConfig from '@config/auth.config';
import { LoggerModule } from './logger/logger.module';
import { UserHttpModule } from './modules/users/user-http.module';
import { AuthModule } from './modules/auth/auth.module';
import { ValidatorModule } from '@validators/validator.module';
import { DatabaseModule } from './database/database.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { TagsModule } from './modules/tags/tags.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UploadFileModule } from './modules/upload-file/upload-file.module';
import { BlogTagModule } from './modules/blog-tag/blog-tag.module';
import { BlogCatModule } from './modules/blog-cat/blog-cat.module';
import { BlogLikeModule } from './modules/blog-like/blog-like.module';
import { UserFollowModule } from './modules/user-follow/user-follow.module';
import { CommentModule } from './modules/comment/comment.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PerDetailModule } from './modules/per-detail/per-detail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentMModule } from './modules/comment-m/comment-m.module';
console.log(join(__dirname, '../../', '/upload'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', '/upload'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    LoggerModule,
    UserHttpModule,
    AuthModule,
    ValidatorModule,
    DatabaseModule,
    BlogsModule,
    TagsModule,
    CategoriesModule,
    UploadFileModule,
    BlogTagModule,
    BlogCatModule,
    BlogLikeModule,
    UserFollowModule,
    CommentModule,
    PermissionModule,
    PerDetailModule,
    CommentMModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
