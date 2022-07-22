import { Injectable } from '@nestjs/common';
import { UploadFile } from './entities/upload-file.entity';
import { BaseService } from '../../base/base.service';
import { LoggerService } from '../../logger/custom.logger';
import { UserService } from '../users/user.service';
import { UploadFileRepository } from './upload-file.repository';
import { EntityId } from 'typeorm/repository/EntityId';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Injectable()
export class UploadFileService extends BaseService<
  UploadFile,
  UploadFileRepository
> {
  constructor(
    repository: UploadFileRepository,
    logger: LoggerService,
    private userService: UserService,
  ) {
    super(repository, logger);
  }

  async uploadFile(
    userId: EntityId,
    file: Express.Multer.File,
  ): Promise<UploadFile> {
    // console.log(file);

    // fs.renameSync(file.path, path.resolve('src/public/file', file.filename));
    const createUploadFile = new UploadFile(null);
    createUploadFile.name = file.filename;
    createUploadFile.url = `${file.filename}`;
    createUploadFile.user_id = <number>userId;
    console.log(file);

    sharp(file.path)
      .resize({
        width: 317,
        height: 262,
      })
      .toFile('upload/' + '262x317-' + file.filename, function(err) {
        if (err) {
          console.error('sharp>>>', err);
        }
        console.log('ok okoko');
      });

    return this.store(createUploadFile);
  }

  async deleteFile(id: EntityId) {
    const file = await this.findById(id);
    // console.log(file);

    await fs.unlink(file.url, err => {
      if (err) {
        console.error(err);
        return err;
      }
    });
    // return file;
    return await this.delete(id);
  }
}
