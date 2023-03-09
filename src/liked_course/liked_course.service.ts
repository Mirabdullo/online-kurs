import { JwtService, JwtModule } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { CreateLikedCourseDto } from './dto/create-liked_course.dto';
import { UpdateLikedCourseDto } from './dto/update-liked_course.dto';
import { LikedCourse } from './entities/liked_course.entity';

@Injectable()
export class LikedCourseService {
  constructor(
    @InjectModel(LikedCourse)
    private likedRepository: typeof LikedCourse,
    private jwtService: JwtService
  ) {}
  async create(createLikedCourseDto: CreateLikedCourseDto, req: Request) {
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
      
      await this.likedRepository.create(createLikedCourseDto);
      return {
        statusCode: 201,
        message: 'Created',
      };
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
