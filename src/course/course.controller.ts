import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Course qoshish' })
  @ApiResponse({ status: 201, type: Course })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]))
  @ApiConsumes('multipart/form-data')
  create(@Body() createCourseDto: CreateCourseDto, @UploadedFiles()  files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] },) {
    return this.courseService.create(createCourseDto, files);
  }

  @ApiOperation({ summary: 'Courselar royxati' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({ summary: 'Category id orqali curslar royxati' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get("category/:id")
  findByCategory(@Param('id') id: string) {
    return this.courseService.findByCategory(id);
  }

  @ApiOperation({ summary: 'Id orqali bitta kourse' })
  @ApiResponse({ status: 200, type: Course })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @ApiOperation({ summary: 'Id orqali bitta course malumotlarini ozgartirish' })
  @ApiResponse({ status: 200, type: Course })
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles() file: any,
  ) {
    return this.courseService.update(id, updateCourseDto, file);
  }

  @ApiOperation({ summary: 'Id orqali courseni ochirish' })
  @ApiResponse({ status: 200, type: Course })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
