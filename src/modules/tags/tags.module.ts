import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './tag.repository';
import { TagSubscriber } from './subscriber/tag.subscriber';
import { UserHttpModule } from '../users/user-http.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagSubscriber],
  imports: [
    TypeOrmModule.forFeature([TagRepository]),
    UserHttpModule,
    AuthModule,
  ],
})
export class TagsModule {}
