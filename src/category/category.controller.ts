import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOperation({ summary: 'Category yaratish' })
  @ApiResponse({ status: 201, type: Category })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @ApiOperation({ summary: 'Barcha categorylar royhati' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @ApiOperation({ summary: 'id orqali bitta category malumotlari' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
  @ApiOperation({ summary: 'Categoryni ozgartirish' })
  @ApiResponse({ status: 200, type: Category })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  @ApiOperation({ summary: 'Categoryni ochirish' })
  @ApiResponse({ status: 200, type: Category })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
