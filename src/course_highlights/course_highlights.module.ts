import { CourseHighlight } from './entities/course_highlight.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CourseHighlightsService } from './course_highlights.service';
import { CourseHighlightsController } from './course_highlights.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([CourseHighlight])
  ],
  controllers: [CourseHighlightsController],
  providers: [CourseHighlightsService]
})
export class CourseHighlightsModule {}
