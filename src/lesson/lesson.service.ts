import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../uploads/files.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson,
  private readonly fileService: FilesService) { }
  async create(createLessonDto: CreateLessonDto, file: any) {
    try {

      const fileName = await this.fileService.createFile(file)
      const lesson = await this.lessonRepository.create({
        ...createLessonDto,
        video: fileName
      })
      return {
        statusCode: 201,
        message: "Created"
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.lessonRepository.findAll({ attributes: ["title", "video", "description", "module_id"], include: { all: true } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async findOne(id: number) {
    try {
      const data = await this.lessonRepository.findByPk(id, { attributes: ["title", "video", "description", "module_id"], include: { all: true } })
      if (!data) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }
      return data
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto, file: any) {
    try {
      const test = await this.lessonRepository.findByPk(id)
      if (!test) return new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)

      if (!file) {
        await this.fileService.removeFile(test.video)
        const fileName = await this.fileService.createFile(file)

        return await this.lessonRepository.update({
          ...updateLessonDto,
            video: fileName
        }, {
          where: { id: id },
        })
      }
      return await this.lessonRepository.update(updateLessonDto, { where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const test = await this.lessonRepository.findByPk(id)
      if (!test) return new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.lessonRepository.destroy({ where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
