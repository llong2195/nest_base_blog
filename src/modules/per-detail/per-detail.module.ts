import { Module } from '@nestjs/common';
import { PerDetailService } from './per-detail.service';
import { PerDetailController } from './per-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerDeltailRepository } from './per-detail.repository';

@Module({
  controllers: [PerDetailController],
  providers: [PerDetailService],
  imports: [TypeOrmModule.forFeature([PerDeltailRepository])],
})
export class PerDetailModule {}
