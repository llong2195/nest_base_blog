import { IsNotEmpty, IsString } from 'class-validator';

export class RBACDto {
  @IsNotEmpty()
  @IsString()
  table: string;

  @IsNotEmpty()
  @IsString()
  action: string;
}
