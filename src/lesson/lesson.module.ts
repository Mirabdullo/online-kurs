import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Lesson } from './entities/lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [SequelizeModule.forFeature([Lesson])]
})
export class LessonModule {}
