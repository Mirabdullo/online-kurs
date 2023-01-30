import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @ApiOperation({ summary: 'Course qoshish' })
  @ApiResponse({ status: 201, type: Course })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createCourseDto: CreateCourseDto, @UploadedFile() image: any) {
    return this.courseService.create(createCourseDto, image);

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
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @UploadedFile() image: any) {
    return this.courseService.update(+id, updateCourseDto, image);
  }

  @ApiOperation({ summary: 'Id orqali courseni ochirish' })
  @ApiResponse({ status: 200, type: Course })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
