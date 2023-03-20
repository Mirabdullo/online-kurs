import { CategoryModule } from './../category/category.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';
import { FilesModule } from '../uploads/files.module';
import { Category } from '../category/entities/category.entity';
import { Statistic } from '../statistics/entities/statistic.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([Course, Category, Statistic]),
    FilesModule,
    ConfigModule,
    CategoryModule
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService]
})
export class CourseModule {}
