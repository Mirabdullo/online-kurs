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

      let token = ''
      for(const item of req.rawHeaders){
        if(item.includes('Bearer')){
          token = item.split(' ')[1]
        }
      }
      if(!token) {
        throw new UnauthorizedException("Token topilmadi")
      }
      const student = this.jwtService.verify(token,{secret: process.env.ACCESS_TOKEN_KEY})
      if(!student) throw new UnauthorizedException("Ruxsat etilmagan")
      console.log(student);
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
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(req: Request) {
    try {
      let token = ''
      for(const item of req.rawHeaders){
        if(item.includes('Bearer')){
          token = item.split(' ')[1]
        }
      }
      if(!token) {
        throw new UnauthorizedException("Token topilmadi")
      }
      const student = this.jwtService.verify(token,{secret: process.env.ACCESS_TOKEN_KEY})
      if(!student) throw new UnauthorizedException("Ruxsat etilmagan")
      return await this.enrolledRepository.findAll({
        attributes: ['student_id', 'course_id'],
        where: {student_id: student.id},
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
