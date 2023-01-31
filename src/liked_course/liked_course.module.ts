import { Module } from '@nestjs/common';
import { LikedCourseService } from './liked_course.service';
import { LikedCourseController } from './liked_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LikedCourse } from './entities/liked_course.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([LikedCourse])
  ],
  controllers: [LikedCourseController],
  providers: [LikedCourseService]
})
export class LikedCourseModule {}
