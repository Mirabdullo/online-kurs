import { LessonModule } from './../lesson/lesson.module';
import { LessonService } from './../lesson/lesson.service';
import { ModulesModule } from './../modules/modules.module';
import { Module, forwardRef } from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { ViewedController } from './viewed.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Viewed } from './entities/viewed.entity';
import { Student } from '../students/entities/student.entity';
import { Course } from '../course/entities/course.entity';
import { Modules } from '../modules/entities/module.entity';
import { Lesson } from '../lesson/entities/lesson.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Viewed, Student, Course, Modules, Lesson]),
    ModulesModule,
    LessonModule
  ],
  controllers: [ViewedController],
  providers: [ViewedService]
})
export class ViewedModule {}
