import { IsNotEmpty } from 'class-validator';

export class CreateUserFollowDto {
  @IsNotEmpty()
  follower_id: number;
}
