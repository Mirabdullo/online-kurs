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

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<any> {
    try {
        if(isArray(file)){
            let fileNames = []
            file.forEach(item => {
                if (item.mimetype === 'image/jpeg' || item.mimetype === 'image/png' || item.mimetype === 'image/svg+xml') {
                    let fileName: string;
                    if (item.mimetype === 'image/jpeg') {
                      fileName = uuid.v4() + '.jpeg';
                    } else if (item.mimetype === 'image/png') {
                      fileName = uuid.v4() + '.png';
                    } else {
                      fileName = uuid.v4() + '.svg';
                    }
                    const filePath = path.resolve(__dirname, '..', 'static', 'images');
                    if (!fs.existsSync(filePath)) {
                      fs.mkdirSync(filePath, { recursive: true });
                    }
                    fs.writeFileSync(path.join(filePath, fileName), item.buffer);
                    fileNames.push(fileName)
                } else if (item.mimetype === 'video/mp4') {
                    const fileName = uuid.v4() + '.mp4';
                    const filePath = path.resolve(__dirname, '..', 'static', 'videos');
                    if (!fs.existsSync(filePath)) {
                      fs.mkdirSync(filePath, { recursive: true });
                    }
                    fs.writeFileSync(path.join(filePath, fileName), item.buffer);
                    fileNames.push(fileName)
                } else {
                    throw new BadRequestException(
                      'Xato fayl kiritildi! (.jpeg  .png .mp4 ) fayllar kiritilishi mumkin',
                    );
                }
            });
            return fileNames
        } else {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg+xml') {
                let fileName: string;
                if (file.mimetype === 'image/jpeg') {
                  fileName = uuid.v4() + '.jpeg';
                } else if (file.mimetype === 'image/png') {
                  fileName = uuid.v4() + '.png';
                } else {
                  fileName = uuid.v4() + '.svg';
                }
                const filePath = path.resolve(__dirname, '..', 'static', 'images');
                if (!fs.existsSync(filePath)) {
                  fs.mkdirSync(filePath, { recursive: true });
                }
                fs.writeFileSync(path.join(filePath, fileName), file.buffer);
                return fileName;
              } else if (file.mimetype === 'video/mp4') {
                const fileName = uuid.v4() + '.mp4';
                const filePath = path.resolve(__dirname, '..', 'static', 'videos');
                if (!fs.existsSync(filePath)) {
                  fs.mkdirSync(filePath, { recursive: true });
                }
                fs.writeFileSync(path.join(filePath, fileName), file.buffer);
                return fileName;
              } else {
                throw new BadRequestException(
                  'Xato fayl kiritildi! (.jpeg  .png .mp4 ) fayllar kiritilishi mumkin',
                );
              }
    
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
