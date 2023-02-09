import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login-auth.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@ApiTags('Admin')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'Admin uchun signup qilishi' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  signup(@Body() createAdminDto: CreateAdminDto, @Res({passthrough: true}) res: Response)  {
    return this.adminsService.signup(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Admin uchun signin qilish' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('signin')
  signin(@Body() loginAdminDto: LoginDto, @Res({passthrough: true}) res: Response)  {
    return this.adminsService.signin(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Admin logout qilish' })
  @ApiResponse({ status: 200, type: Admin })
  @Get('logout/:id')
  logout(@Param('id') id: string){
    return this.adminsService.logout(+id)
  }

  @ApiOperation({ summary: 'Barcha adminlar royxati' })
  @ApiResponse({ status: 200, type: Admin })
  @Get('all')
  findAll() {
    return this.adminsService.findAll();
  }


  @ApiOperation({ summary: 'Id orqali bitta admin malumotlarini olish' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }


  @ApiOperation({ summary: 'Id orqali bitta admin malumotlarini ozgartirish' })
  @ApiResponse({ status: 200, type: Admin })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }


  @ApiOperation({ summary: 'Adminni ochirish logout' })
  @ApiResponse({ status: 200, type: Admin })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
