import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string>{
        try {
            let extname: string
            if(file.mimetype === 'image/jpeg'){
                extname = '.jpeg'
            } else if(file.mimetype === 'image/png'){
                extname = '.png'
            } else if(file.mimetype === 'video/mp4'){
                extname = '.mp4'
            }else if(file.mimetype === 'application/pdf'){
                extname = '.pdf'
            } else {
                throw new BadRequestException("Xato fayl kiritildi! (.jpeg  .png .mp4  .pdf) fayllar kiritilishi mumkin")
            }
            const fileName = uuid.v4() + extname
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath,fileName), file.buffer)
            return fileName
        } catch (error) {
            console.log(error);
            throw new HttpException(
                "Faylni yozishda xatolik",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }


    async removeFile(image: any){
        try {
            const filePath = path.resolve(__dirname, '..', 'static')
            fs.unlinkSync(path.join(filePath,image))
            return true
        } catch (error) {
            throw new HttpException("Faylni yangilashda xatolik", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


}
