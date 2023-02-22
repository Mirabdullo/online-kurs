import { PartialType } from '@nestjs/swagger';
import { CreateCourseHighlightDto } from './create-course_highlight.dto';

export class UpdateCourseHighlightDto extends PartialType(CreateCourseHighlightDto) {}
