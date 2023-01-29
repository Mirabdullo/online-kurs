import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  fileService: any;
  constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson) { }
  async create(createLessonDto: CreateLessonDto, img: any) {
    try {

      const fileName = await this.fileService.createFile(img)
      const lesson = await this.lessonRepository.create({
        ...createLessonDto,
        image: fileName
      })
      return lesson
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.lessonRepository.findAll({ include: { all: true } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async findOne(id: number) {
    try {
      const data = await this.lessonRepository.findByPk(id)
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }
      return data
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto, img: any) {
    try {
      const test = await this.lessonRepository.findByPk(id)
      if (!test) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)

      if (!img) {
        await this.fileService.removeFile(test.image)
        const fileName = await this.fileService.createFile(img)

        return await this.lessonRepository.update({
          ...updateLessonDto,
            image: fileName
        }, {
          where: { id: id },
          returning: true
        })
      }
      return await this.lessonRepository.update(updateLessonDto, { where: { id: id }, returning: true })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const test = await this.lessonRepository.findByPk(id)
      if (!test) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.lessonRepository.destroy({ where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
