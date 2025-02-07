import {
  Controller,
  Req,
  Res,
  Body,
  Post,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
  UploadedFile,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { DeleteQuizRemoveDto } from './dto/deleteQuiz.dto';
import * as Multer from 'multer';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('get')
  async getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    return this.quizService.get(pageNumber, limitNumber);
  }
  @Get('getone')
  get_one(@Query('id') id: string) {
    return this.quizService.get_one(id);
  }

  @Post('createquiz')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mainImg', maxCount: 1 }], {
      storage: Multer.memoryStorage(),
    }),
  )
  async create_quiz(
    @UploadedFiles() file: { mainImg?: Multer.File },
    @Body() data: CreateQuizDto,
    @Req() req: any,
  ) {
    const mainImg = file?.mainImg ? file : null;
    return await this.quizService.create_quiz(file, data, req);
  }

  @Post('removequize')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove_quiz(@Body() data: DeleteQuizRemoveDto, @Req() req: any) {
    return await this.quizService.remove_quiz(data, req);
  }
}
