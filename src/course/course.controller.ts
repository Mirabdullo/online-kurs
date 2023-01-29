import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Course qoshish' })
  @ApiResponse({ status: 201, type: Course })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @UploadedFile() img) {
    return this.courseService.create(createCourseDto, img);
  }

  @ApiOperation({ summary: 'Courselar royxati' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({ summary: 'Id orqali bitta kourse' })
  @ApiResponse({ status: 200, type: Course })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @ApiOperation({ summary: 'Id orqali bitta kourse malumotlarini ozgartirish' })
  @ApiResponse({ status: 200, type: Course })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, img: any) {
    return this.courseService.update(+id, updateCourseDto, img);
  }

  @ApiOperation({ summary: 'Id orqali courseni ochirish' })
  @ApiResponse({ status: 200, type: Course })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
