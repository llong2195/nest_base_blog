import { EntityRepository, Repository } from 'typeorm';
import { PerDetail } from './entities/per-detail.entity';

@EntityRepository(PerDetail)
export class PerDeltailRepository extends Repository<PerDetail> {}
