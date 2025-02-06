import { IsString } from 'class-validator';

export class IEndRegister {
  @IsString()
  user: string;
  code: string;
}
