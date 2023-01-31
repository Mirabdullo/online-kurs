import { Module } from '@nestjs/common';
import { EnrolledCourseService } from './enrolled_course.service';
import { EnrolledCourseController } from './enrolled_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrolledCourse } from './entities/enrolled_course.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([EnrolledCourse])
  ],
  controllers: [EnrolledCourseController],
  providers: [EnrolledCourseService]
})
export class EnrolledCourseModule {}
