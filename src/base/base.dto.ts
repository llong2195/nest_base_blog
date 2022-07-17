export class BaseResponseDto<T> {
  message: string;
  data: T;
  constructor(message: string, data: T | null = null) {
    this.message = message;
    this.data = data;
  }
}
export class AuthUserDto {
  email: string;
  id: number;
}
