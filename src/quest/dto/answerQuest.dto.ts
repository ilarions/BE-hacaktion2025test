import {
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AnswerDto {
  @IsBoolean()
  @ApiProperty({ example: true })
  isCorrect: boolean;

  @IsString()
  @ApiProperty({ example: '' })
  text: string;
}
