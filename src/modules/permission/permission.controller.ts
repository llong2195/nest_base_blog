import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BaseResponseDto } from '../../base/base.dto';
import { Permission } from './entities/permission.entity';
import { plainToClass } from 'class-transformer';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm/index';
import { RBACGuard } from '../auth/guards/rbac.guard';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { TABLE, ACTION } from '../per-detail/entities/per-detail.entity';

@Controller('permission')
@UseGuards(JwtAuthGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(RBACGuard)
  @RBAC({ table: TABLE.PERMISSION, action: ACTION.CREATE })
  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<BaseResponseDto<Permission>> {
    const permission = await this.permissionService.create(createPermissionDto);
    return new BaseResponseDto<Permission>(
      'Success',
      plainToClass(Permission, permission),
    );
  }

  @Get()
  async index(): Promise<BaseResponseDto<Permission[]>> {
    const permissions = await this.permissionService.index();
    return new BaseResponseDto<Permission[]>(
      'Success',
      plainToClass(Permission, permissions),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<Permission>> {
    const permission = await this.permissionService.findById(id);
    return new BaseResponseDto<Permission>(
      'Success',
      plainToClass(Permission, permission),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<BaseResponseDto<Permission>> {
    const permission = await this.permissionService.update(
      +id,
      updatePermissionDto,
    );
    return new BaseResponseDto<Permission>(
      'Success',
      plainToClass(Permission, permission),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.permissionService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
