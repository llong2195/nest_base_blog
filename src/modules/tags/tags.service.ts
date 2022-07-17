import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { BaseService } from '../../base/base.service';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './tag.repository';
import { LoggerService } from '../../logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';
import { UserService } from '../users/user.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DeleteResult } from 'typeorm/index';

@Injectable()
export class TagsService extends BaseService<Tag, TagRepository> {
  constructor(
    repository: TagRepository,
    logger: LoggerService,
    private userService: UserService,
  ) {
    super(repository, logger);
  }

  getInactiveTags(): Promise<Tag[]> {
    return this.repository.find({ where: { deleted: false } });
  }

  async create(createTagDto: CreateTagDto, userId: EntityId): Promise<Tag> {
    const exits = await this.repository.findOne({
      where: { name: createTagDto.name },
    });
    if (exits) {
      throw new HttpException(
        `'${createTagDto.name}' is Duplicate`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createTag = new Tag(createTagDto);
    createTag.user_id = <number>userId;
    const tag = this.store(createTag);
    return tag;
  }

  async upgrade(id: EntityId, updateTagDto: UpdateTagDto): Promise<Tag> {
    const exits = await this.repository.findOne({
      where: { name: updateTagDto.name },
    });
    if (exits) {
      throw new HttpException(
        `'${updateTagDto.name}' is Duplicate`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const tag = this.update(id, updateTagDto);
    return tag;
  }

  async softDelete(id: EntityId): Promise<DeleteResult> {
    return this.repository.update(id, { deleted: true });
  }

  async restore(id: EntityId): Promise<Tag> {
    await this.repository.update(id, { deleted: false });
    return this.findById(id);
  }
}
