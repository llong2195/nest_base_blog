import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PerDetailService } from './per-detail.service';
import { CreatePerDetailDto } from './dto/create-per-detail.dto';
import { UpdatePerDetailDto } from './dto/update-per-detail.dto';
import { EntityId } from 'typeorm/repository/EntityId';
import { BaseResponseDto } from '../../base/base.dto';
import { PerDetail } from './entities/per-detail.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';

@Controller('per-detail')
export class PerDetailController {
  constructor(private readonly perDetailService: PerDetailService) {}

  @Post()
  async create(
    @Body() createPerDetailDto: CreatePerDetailDto,
  ): Promise<BaseResponseDto<PerDetail>> {
    const perDetail = await this.perDetailService.create(createPerDetailDto);
    return new BaseResponseDto<PerDetail>(
      'Success',
      plainToClass(PerDetail, perDetail),
    );
  }

  @Get('')
  async index(): Promise<BaseResponseDto<PerDetail[]>> {
    const perDetail = await this.perDetailService.index();
    return new BaseResponseDto<PerDetail[]>(
      'Success',
      plainToClass(PerDetail, perDetail),
    );
  }

  @Get(':per_id')
  async findByPerId(
    @Param('per_id') id: EntityId,
  ): Promise<BaseResponseDto<PerDetail[]>> {
    const perDetail = await this.perDetailService.findByPerId(id);
    return new BaseResponseDto<PerDetail[]>(
      'Success',
      plainToClass(PerDetail, perDetail),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<PerDetail>> {
    const perDetail = await this.perDetailService.findById(id);
    return new BaseResponseDto<PerDetail>(
      'Success',
      plainToClass(PerDetail, perDetail),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updatePerDetailDto: UpdatePerDetailDto,
  ): Promise<BaseResponseDto<PerDetail>> {
    const perDetail = await this.perDetailService.update(
      id,
      updatePerDetailDto,
    );
    return new BaseResponseDto<PerDetail>(
      'Success',
      plainToClass(PerDetail, perDetail),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: EntityId,
  ): Promise<BaseResponseDto<DeleteResult>> {
    await this.perDetailService.delete(id);
    return new BaseResponseDto<DeleteResult>('Success', null);
  }
}
