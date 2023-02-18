import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { LoginDto } from './dto/login-auth.dto';

@ApiTags('Student')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Student uchun signup qilishi' })
  @ApiResponse({ status: 201, type: Student })
  @Post('signup')
  signup(
    @Body() createStudentDto: CreateStudentDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.studentsService.signup(createStudentDto, res, req);
  }

  @ApiOperation({ summary: 'Student uchun signin qilish' })
  @ApiResponse({ status: 200, type: Student })
  @Post('signin')
  signin(
    @Body() loginStudentDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentsService.signin(loginStudentDto, res);
  }

  @ApiOperation({ summary: 'Student logout qilish' })
  @ApiResponse({ status: 200, type: Student })
  @Get('logout/:id')
  logout(@Param('id') id: string, @Req() req: Request) {
    return this.studentsService.logout(id, req);
  }

  @ApiOperation({ summary: 'Barcha studentlar royxatini olish' })
  @ApiResponse({ status: 200, type: Student })
  @Get('all')
  findAll() {
    return this.studentsService.findAll();
  }

  @ApiOperation({ summary: 'Id boyicha bitta student malumotlarini olish' })
  @ApiResponse({ status: 200, type: Student })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Id orqali student malumotlarini ozgartirish' })
  @ApiResponse({ status: 200, type: Student })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Student ochirish' })
  @ApiResponse({ status: 200, type: Student })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }


  @ApiOperation({ summary: 'Student uchun signup qilishi' })
  @ApiResponse({ status: 201, type: Student })
  @Post('refresh-token')
  refreshToken(
    @Body() token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentsService.refreshToken(token, res);
  }
}
