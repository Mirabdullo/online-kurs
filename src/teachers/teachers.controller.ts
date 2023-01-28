import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';

@ApiTags('Teacher')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @ApiOperation({summary: "Teacher registratsiya"})
  @ApiResponse({status: 201, type: Teacher})
  @Post('signup')
  signup(@Body() createTeacherDto: CreateTeacherDto, @Res({passthrough: true}) res: Response) {
    return this.teachersService.signup(createTeacherDto, res);
  }

  @ApiOperation({summary: "Teacher login"})
  @ApiResponse({status: 200, type: Teacher})
  @Post('signin')
  signin(@Body() createTeacherDto: CreateTeacherDto, @Res({passthrough: true}) res: Response) {
    return this.teachersService.signin(createTeacherDto, res);
  }

  @ApiOperation({summary: "Teacherlar royxati"})
  @ApiResponse({status: 200, type: Teacher})
  @Get('all')
  findAll() {
    return this.teachersService.findAll();
  }

  @ApiOperation({summary: "Id orqali bitta teacher malumotlarini olish"})
  @ApiResponse({status: 200, type: Teacher})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @ApiOperation({summary: "Id orqali bitta teacher malumotlarini ozgartirish"})
  @ApiResponse({status: 200, type: Teacher})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @ApiOperation({summary: "teacherni ochirish logout"})
  @ApiResponse({status: 200, type: Teacher})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
