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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Viewed')
@Controller('viewed')
export class ViewedController {
  constructor(private readonly viewedService: ViewedService) {}

  @Post()
  create(@Body() createViewedDto: CreateViewedDto) {
    return this.viewedService.create(createViewedDto);
  }

  @Get()
  findAll() {
    return this.viewedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewedService.findOne(id);
  }

  @Get('viewed/:id')
  findViewed(@Param('id') id: string){
    return this.viewedService.findLevelCourses(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewedDto: UpdateViewedDto) {
    return this.viewedService.update(id, updateViewedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewedService.remove(id);
  }
}
