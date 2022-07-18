import { Injectable } from '@nestjs/common';
import { CreatePerDetailDto } from './dto/create-per-detail.dto';
import { BaseService } from '../../base/base.service';
import { PerDetail } from './entities/per-detail.entity';
import { PerDeltailRepository } from './per-detail.repository';
import { LoggerService } from '../../logger/custom.logger';
import { EntityId } from 'typeorm/repository/EntityId';

@Injectable()
export class PerDetailService extends BaseService<
  PerDetail,
  PerDeltailRepository
> {
  constructor(repository: PerDeltailRepository, logger: LoggerService) {
    super(repository, logger);
  }

  async create(createPerDetailDto: CreatePerDetailDto): Promise<PerDetail> {
    return this.store(createPerDetailDto);
  }

  findByPerId(perId: EntityId): Promise<PerDetail[]> {
    return this.repository.find({ where: { per_id: perId } });
  }
}
