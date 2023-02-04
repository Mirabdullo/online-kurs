import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string>{
        try {
            let extname: string
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                const fileName = uuid.v4() + '.jpeg'
                const filePath = path.resolve(__dirname, '..', 'static', 'images')
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath, {recursive: true})
                }
                fs.writeFileSync(path.join(filePath,fileName), file.buffer)
                return fileName
            } else if(file.mimetype === 'video/mp4'){
                const fileName = uuid.v4() + '.mp4'
                const filePath = path.resolve(__dirname, '..', 'static', 'videos')
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath, {recursive: true})
                }
                fs.writeFileSync(path.join(filePath,fileName), file.buffer)
                return fileName
            } else {
                throw new BadRequestException("Xato fayl kiritildi! (.jpeg  .png .mp4 ) fayllar kiritilishi mumkin")
            }
        } catch (error) {
            console.log(error);
            throw new HttpException(
                "Faylni yozishda xatolik",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }


    async removeFile(file: any){
        try {
            if(file.mimetype === 'image/jpeg'){
                const filePath = path.resolve(__dirname, '../', 'static/', 'images')
                fs.unlinkSync(path.join(filePath,file))
                return true
            }else if(file.mimetype === 'video/mp4'){
                const filePath = path.resolve(__dirname, '../', 'static', 'videos')
                fs.unlinkSync(path.join(filePath,file))
                return true
            }else {
                throw new HttpException("Faylni yangilashda xatolik", HttpStatus.FAILED_DEPENDENCY)
            }

        } catch (error) {
            throw new HttpException("Faylni yangilashda xatolik", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


}
