import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@config/multer.config';
import { EntityId } from 'typeorm/repository/EntityId';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { AuthUserDto, BaseResponseDto } from '../../base/base.dto';
import { UploadFile } from './entities/upload-file.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';

@Controller('upload-file')
@UseGuards(JwtAuthGuard)
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @AuthUser() authUser: AuthUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResponseDto<UploadFile>> {
    const uploadfile = await this.uploadFileService.uploadFile(
      authUser.id,
      file,
    );
    return new BaseResponseDto<UploadFile>(
      'Success',
      plainToClass(UploadFile, uploadfile),
    );
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<UploadFile[]>> {
    const files = await this.uploadFileService.index();
    return new BaseResponseDto<UploadFile[]>(
      'Success',
      plainToClass(UploadFile, files),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<UploadFile>> {
    const file = await this.uploadFileService.findById(id);
    return new BaseResponseDto<UploadFile>(
      'Success',
      plainToClass(UploadFile, file),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.uploadFileService.deleteFile(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
