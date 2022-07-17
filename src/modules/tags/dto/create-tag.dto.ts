import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
