import { isArray } from 'class-validator';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { extname } from 'path';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<any> {
    try {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/svg+xml' ||
        file.mimetype === 'video/mp4'
      ) {
        let fileName = uuid.v4() + extname(file.originalname);
        const filePath = path.resolve(__dirname, '..', 'static');
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.join(filePath, fileName), file.buffer);
        return fileName;
      } else {
        throw new BadRequestException(
          'Xato fayl kiritildi! (.jpeg  .png .mp4 .svg ) fayllar kiritilishi mumkin',
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Faylni yozishda xatolik',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }

  async removeFile(file: any) {
    try {
      if (file.mimetype === 'image/jpeg') {
        const filePath = path.resolve(__dirname, '../', 'static/', 'images');
        fs.unlinkSync(path.join(filePath, file));
        return true;
      } else if (file.mimetype === 'video/mp4') {
        const filePath = path.resolve(__dirname, '../', 'static', 'videos');
        fs.unlinkSync(path.join(filePath, file));
        return true;
      } else {
        throw new HttpException(
          'Faylni yangilashda xatolik',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Faylni yangilashda xatolik',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
