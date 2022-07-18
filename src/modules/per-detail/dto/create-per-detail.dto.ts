import { IsEnum, IsNotEmpty } from 'class-validator';
import { ACTION, TABLE } from '../entities/per-detail.entity';

export class CreatePerDetailDto {
  @IsNotEmpty()
  per_id: number;

  @IsNotEmpty()
  @IsEnum(ACTION)
  action: ACTION;

  @IsNotEmpty()
  @IsEnum(TABLE)
  table: TABLE;
}
