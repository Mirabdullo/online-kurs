import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikedCourseService } from './liked_course.service';
import { CreateLikedCourseDto } from './dto/create-liked_course.dto';
import { UpdateLikedCourseDto } from './dto/update-liked_course.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Liked course')
@Controller('liked-course')
export class LikedCourseController {
  constructor(private readonly likedCourseService: LikedCourseService) {}

  @Post()
  create(@Body() createLikedCourseDto: CreateLikedCourseDto) {
    return this.likedCourseService.create(createLikedCourseDto);
  }

  @Get()
  findAll() {
    return this.likedCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likedCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikedCourseDto: UpdateLikedCourseDto) {
    return this.likedCourseService.update(+id, updateLikedCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likedCourseService.remove(+id);
  }
}
