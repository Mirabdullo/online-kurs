import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnrolledCourseService } from './enrolled_course.service';
import { CreateEnrolledCourseDto } from './dto/create-enrolled_course.dto';
import { UpdateEnrolledCourseDto } from './dto/update-enrolled_course.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('enrolled course')
@Controller('enrolled-course')
export class EnrolledCourseController {
  constructor(private readonly enrolledCourseService: EnrolledCourseService) {}

  @Post()
  create(@Body() createEnrolledCourseDto: CreateEnrolledCourseDto) {
    return this.enrolledCourseService.create(createEnrolledCourseDto);
  }

  @Get()
  findAll() {
    return this.enrolledCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrolledCourseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnrolledCourseDto: UpdateEnrolledCourseDto,
  ) {
    return this.enrolledCourseService.update(id, updateEnrolledCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrolledCourseService.remove(id);
  }
}
