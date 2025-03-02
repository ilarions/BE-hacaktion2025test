import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class ChangeNameDto {
  @IsString()
  @ApiProperty({ example: '' })
  name: string
}
