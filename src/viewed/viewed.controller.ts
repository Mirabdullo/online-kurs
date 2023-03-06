import { Viewed } from './entities/viewed.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Viewed')
@Controller('viewed')
export class ViewedController {
  constructor(private readonly viewedService: ViewedService) {}

  @ApiOperation({ summary: 'Viewed yaratish' })
  @ApiResponse({ status: 201, type: Viewed })
  @Post()
  create(@Body() createViewedDto: CreateViewedDto) {
    return this.viewedService.create(createViewedDto);
  }

  @ApiOperation({ summary: 'Barcha korilgan darslar royxati' })
  @ApiResponse({ status: 200, type: [Viewed] })
  @Get()
  findAll() {
    return this.viewedService.findAll();
  }

  @ApiOperation({ summary: 'Viewed id orqali Kursni necha foizini yakunlagani haqida' })
  @ApiResponse({ status: 200, type: Viewed })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewedService.findOne(id);
  }

  @ApiOperation({ summary: 'Korilganlarni id orqali ochirish' })
  @ApiResponse({ status: 200, type: Viewed })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewedService.remove(id);
  }
}
