import { IsString } from 'class-validator';

export class IRegistretion {
  @IsString()
  name: string;
  password: string;
  email: string;
}
