import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FILE_UPLOADS_DIR } from './constants';
import { fileNameEditor, imageFileFilter } from './file.utils';
import { CreateFileDto } from './dto/create-file.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor,
        destination: FILE_UPLOADS_DIR,
      }),
      limits: {
        fileSize: 1000 * 1000 * 1, // 1mb
      },
      fileFilter: imageFileFilter,
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    return {
      filename: file.fieldname,
      size: file.fieldname,
      dto,
    };
  }
}
