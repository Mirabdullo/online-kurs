import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEnrolledCourseDto } from './dto/create-enrolled_course.dto';
import { UpdateEnrolledCourseDto } from './dto/update-enrolled_course.dto';
import { EnrolledCourse } from './entities/enrolled_course.entity';

@Injectable()
export class EnrolledCourseService {
  constructor(
    @InjectModel(EnrolledCourse)
    private enrolledRepository: typeof EnrolledCourse,
  ) {}
  async create(createEnrolledCourseDto: CreateEnrolledCourseDto) {
    try {
      await this.enrolledRepository.create(createEnrolledCourseDto);
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
      return await this.enrolledRepository.findAll({
        attributes: ['student_id', 'course_id'],
        include: { all: true },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.enrolledRepository.findAll({
        where: { student_id: id },
        attributes: ['student_id'],
        include: { all: true },
      });
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateEnrolledCourseDto: UpdateEnrolledCourseDto) {
    try {
      const enrolled = await this.enrolledRepository.findByPk(id);
      if (!enrolled)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      await this.enrolledRepository.update(updateEnrolledCourseDto, {
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
      const enrolled = await this.enrolledRepository.findByPk(id);
      if (!enrolled)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.enrolledRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
