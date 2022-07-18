import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseService } from '../../base/base.service';
import { Permission } from './entities/permission.entity';
import { PermissionRepository } from './permission.repository';
import { LoggerService } from '../../logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm/index';
import { RBACDto } from '../auth/dto/rbac.dto';

@Injectable()
export class PermissionService extends BaseService<
  Permission,
  PermissionRepository
> {
  constructor(repository: PermissionRepository, logger: LoggerService) {
    super(repository, logger);
  }

  async checkPermission({
    rbacDto,
    userId,
  }: {
    rbacDto: RBACDto;
    userId: EntityId;
  }): Promise<boolean> {
    const checkAdmin = await this.checkAdmin(userId);
    if (checkAdmin) {
      return true;
    }
    const query = await this.repository
      .query(`SELECT * FROM nest_blog.permission
      inner join per_detail on per_detail.per_id = permission.id
      where per_id = ${userId} and action_name = '${rbacDto.action}' and table_name = '${rbacDto.table}'
      
    `);
    console.log(query);

    if (query[0]?.name === 'ADMIN') {
      return true;
    }

    if (query.length) {
      return true;
    }

    return false;
  }

  async checkAdmin(id: EntityId): Promise<boolean> {
    const data = await this.repository.query(`SELECT * FROM nest_blog.permission
    inner join users on users.per_id = permission.id
    where users.id = ${id}`);
    return data[0]?.name === 'ADMIN';
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const exits = await this.repository.findOne({
      where: { name: createPermissionDto.name },
    });
    if (exits) {
      throw new HttpException(
        `'${createPermissionDto.name}' is Duplicate`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createPermission = new Permission(createPermissionDto);
    const permission = this.store(createPermission);
    return permission;
  }

  async upgrade(
    id: EntityId,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const exits = await this.repository.findOne({
      where: { name: updatePermissionDto.name },
    });
    if (exits) {
      throw new HttpException(
        `'${updatePermissionDto.name}' is Duplicate`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const permission = this.update(id, updatePermissionDto);
    return permission;
  }

  async softDelete(id: EntityId): Promise<DeleteResult> {
    return this.repository.update(id, { deleted: true });
  }

  async restore(id: EntityId): Promise<Permission> {
    await this.repository.update(id, { deleted: false });
    return this.findById(id);
  }
}
