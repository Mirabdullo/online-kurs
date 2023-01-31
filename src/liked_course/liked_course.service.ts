import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLikedCourseDto } from './dto/create-liked_course.dto';
import { UpdateLikedCourseDto } from './dto/update-liked_course.dto';
import { LikedCourse } from './entities/liked_course.entity';

@Injectable()
export class LikedCourseService {
  constructor(
    @InjectModel(LikedCourse)
    private likedRepository: typeof LikedCourse,
  ) {}
  async create(createLikedCourseDto: CreateLikedCourseDto) {
    try {
      return await this.likedRepository.create(createLikedCourseDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.likedRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.likedRepository.findByPk(id);
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateLikedCourseDto: UpdateLikedCourseDto) {
    try {
      const enrolled = await this.likedRepository.findByPk(id);
      if (!enrolled)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      return await this.likedRepository.update(updateLikedCourseDto, {
        where: { id: id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const enrolled = await this.likedRepository.findByPk(id);
      if (!enrolled)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.likedRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
