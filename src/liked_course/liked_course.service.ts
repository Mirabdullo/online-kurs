import { Injectable } from '@nestjs/common';
import { CreateLikedCourseDto } from './dto/create-liked_course.dto';
import { UpdateLikedCourseDto } from './dto/update-liked_course.dto';

@Injectable()
export class LikedCourseService {
  create(createLikedCourseDto: CreateLikedCourseDto) {
    return 'This action adds a new likedCourse';
  }

  findAll() {
    return `This action returns all likedCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likedCourse`;
  }

  update(id: number, updateLikedCourseDto: UpdateLikedCourseDto) {
    return `This action updates a #${id} likedCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} likedCourse`;
  }
}
