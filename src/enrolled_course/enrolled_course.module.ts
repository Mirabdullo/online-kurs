import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { EnrolledCourseService } from './enrolled_course.service';
import { EnrolledCourseController } from './enrolled_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrolledCourse } from './entities/enrolled_course.entity';
import { Student } from '../students/entities/student.entity';
import { Course } from '../course/entities/course.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([EnrolledCourse, Student, Course]),
    JwtModule
  ],
  controllers: [EnrolledCourseController],
  providers: [EnrolledCourseService]
})
export class EnrolledCourseModule {}
