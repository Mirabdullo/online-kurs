import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Lesson } from './entities/lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../uploads/files.module';
import { Modules } from '../modules/entities/module.entity';

@Module({
  imports: [SequelizeModule.forFeature([Lesson, Modules]),
  FilesModule
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService]
})
export class LessonModule {}
