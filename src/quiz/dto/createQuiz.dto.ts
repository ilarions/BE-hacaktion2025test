import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { File } from 'multer';
export class CreateQuizDto {
  @IsString()
  @ApiProperty({ example: '' })
  title: string;
  @ApiProperty({ example: '' })
  description: string;
  @ApiProperty({
    description: 'Main image for the quiz.',
    type: 'string',
    format: 'binary',
  })
  mainImg: File;
}
