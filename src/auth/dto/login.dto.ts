import { IsString } from 'class-validator';

export class ILogin {
  @IsString()
  password: string;
  email: string;
}
