import { Lesson } from './../lesson/entities/lesson.entity';
import { LessonService } from './../lesson/lesson.service';
import { forwardRef, Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Modules } from './entities/module.entity';
import { FilesModule } from '../uploads/files.module';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Modules]),
    FilesModule,
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}
