import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateBlogDto {
  // @IsNotEmpty({ message: 'userId is not empty' })
  // @IsNumber(undefined, { message: 'userId invalid' })
  // userId: number

  @IsNotEmpty({ message: 'content is not empty' })
  content: string
}
