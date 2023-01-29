import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Lesson } from './entities/lesson.entity';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }
  @ApiOperation({ summary: 'Lesson yaratish' })
  @ApiResponse({ status: 201, type: Lesson })
  @Post()
  create(@Body() createLessonDto: CreateLessonDto, @UploadedFile() img: any) {
    return this.lessonService.create(createLessonDto, img);
  }
  @ApiOperation({ summary: 'Barcha lessonlar royhati' })
  @ApiResponse({ status: 200, type: [Lesson] })
  @Get()
  findAll() {
    return this.lessonService.findAll();
  }
  @ApiOperation({ summary: 'id orqali bitta lesson malumotlari' })
  @ApiResponse({ status: 200, type: Lesson })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }
  @ApiOperation({ summary: 'Lessonni ozgartirish' })
  @ApiResponse({ status: 200, type: Lesson })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto, @UploadedFile() img: any) {
    return this.lessonService.update(+id, updateLessonDto,img);
  }
  @ApiOperation({ summary: 'Lessonni ochirish' })
  @ApiResponse({ status: 200, type: Lesson })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
