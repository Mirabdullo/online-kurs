import { Module } from '@nestjs/common';
import { LikedCourseService } from './liked_course.service';
import { LikedCourseController } from './liked_course.controller';

@Module({
  controllers: [LikedCourseController],
  providers: [LikedCourseService]
})
export class LikedCourseModule {}
