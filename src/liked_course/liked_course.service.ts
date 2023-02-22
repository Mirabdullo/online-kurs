import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
      await this.likedRepository.create(createLikedCourseDto);
      return {
        statusCode: 201,
        message: 'Created',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.likedRepository.findAll({
        attributes: ['student_id', 'course_id'],
        include: { all: true },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.likedRepository.findByPk(id, {
        attributes: ['student_id', 'course_id'],
        include:{all: true}
      });
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateLikedCourseDto: UpdateLikedCourseDto) {
    try {
      const enrolled = await this.likedRepository.findByPk(id);
      if (!enrolled)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      await this.likedRepository.update(updateLikedCourseDto, {
        where: { id: id },
      });

      return {
        statusCode: 200,
        message: "Updated"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const enrolled = await this.likedRepository.findByPk(id);
      if (!enrolled)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.likedRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
