import { CourseHighlight } from './entities/course_highlight.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseHighlightsService } from './course_highlights.service';
import { CreateCourseHighlightDto } from './dto/create-course_highlight.dto';
import { UpdateCourseHighlightDto } from './dto/update-course_highlight.dto';

@ApiTags('Course Highlights')
@Controller('course-highlights')
export class CourseHighlightsController {
  constructor(private readonly courseHighlightsService: CourseHighlightsService) {}

  @ApiOperation({summary: "Course and Highlightni boglash"})
  @ApiResponse({status: 201, type: CourseHighlight})
  @Post()
  create(@Body() createCourseHighlightDto: CreateCourseHighlightDto) {
    return this.courseHighlightsService.create(createCourseHighlightDto);
  }

  @ApiOperation({summary: "Course and Highlight royxati"})
  @ApiResponse({status: 200, type: [CourseHighlight]})
  @Get()
  findAll() {
    return this.courseHighlightsService.findAll();
  }

  @ApiOperation({summary: "Course and Highlight id orqaki bittasini olish"})
  @ApiResponse({status: 200, type: CourseHighlight})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseHighlightsService.findOne(id);
  }

  @ApiOperation({summary: "Course and Highlightni id orqali bittasi malumotlarini ozgartirish"})
  @ApiResponse({status: 200, type: CourseHighlight})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseHighlightDto: UpdateCourseHighlightDto) {
    return this.courseHighlightsService.update(id, updateCourseHighlightDto);
  }


  @ApiOperation({summary: "Course and Highlightni id orqali bittasi malumotlarini ochirish"})
  @ApiResponse({status: 200, type: CourseHighlight})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseHighlightsService.remove(id);
  }
}
