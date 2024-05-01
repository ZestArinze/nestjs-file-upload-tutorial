import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOADS_DIR } from './constants';

@Module({
  imports: [
    MulterModule.register({
      dest: FILE_UPLOADS_DIR,
      limits: {
        fileSize: 1000 * 1000 * 10,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
