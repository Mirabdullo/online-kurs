import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';
import { FilesModule } from '../uploads/files.module';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Course, Category]),
    FilesModule
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
