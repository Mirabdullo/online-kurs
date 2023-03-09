import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { CreateEnrolledCourseDto } from './dto/create-enrolled_course.dto';
import { UpdateEnrolledCourseDto } from './dto/update-enrolled_course.dto';
import { EnrolledCourse } from './entities/enrolled_course.entity';

@Injectable()
export class EnrolledCourseService {
  constructor(
    @InjectModel(EnrolledCourse)
    private enrolledRepository: typeof EnrolledCourse,
    private jwtService: JwtService
  ) {}
  async create(createEnrolledCourseDto: CreateEnrolledCourseDto, req: Request) {
    try {

      let token = req.headers.authorization
      if(!token) {
        throw new UnauthorizedException("Token topilmadi")
      }
      const student = this.jwtService.verify(token,{secret: process.env.ACCESS_TOKEN_KEY})
      
      await this.enrolledRepository.create({
        student_id: student.id,
        course_id: createEnrolledCourseDto.course_id
      });
      return {
        statusCode: 201,
        message: 'Created',
      };
    } catch (error) {
      console.log(error);
      if (error.message.includes('invalid signature')) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(req: Request) {
    try {
      let token = req.headers.authorization
      if(!token) {
        throw new UnauthorizedException("Token topilmadi")
      }
      const student = this.jwtService.verify(token,{secret: process.env.ACCESS_TOKEN_KEY})
      
      return await this.enrolledRepository.findAll({
        attributes: ['student_id', 'course_id'],
        where: {student_id: student.id},
        include: { all: true },
        
      });
    } catch (error) {
      if (error.message.includes('invalid signature')) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
      }
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
