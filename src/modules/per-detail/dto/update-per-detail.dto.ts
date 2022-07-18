import { PartialType } from '@nestjs/mapped-types';
import { CreatePerDetailDto } from './create-per-detail.dto';

export class UpdatePerDetailDto extends PartialType(CreatePerDetailDto) {}
