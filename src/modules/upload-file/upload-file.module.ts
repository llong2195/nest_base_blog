import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { UserHttpModule } from '../users/user-http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFileRepository } from './upload-file.repository';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
  imports: [TypeOrmModule.forFeature([UploadFileRepository]), UserHttpModule],
})
export class UploadFileModule {}
