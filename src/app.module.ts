import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { APP_FILTER } from '@nestjs/core'
import { AllExceptionFilter } from './filter/exception.filter'

import appConfig from '@config/app.config'
import databaseConfig from '@config/database.config'
import authConfig from '@config/auth.config'
import { LoggerModule } from './logger/logger.module'
import { UserHttpModule } from './modules/users/user-http.module'
import { AuthModule } from './modules/auth/auth.module'
import { ValidatorModule } from '@validators/validator.module'
import { DatabaseModule } from './database/database.module'
import { BlogsModule } from './modules/blogs/blogs.module'

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
