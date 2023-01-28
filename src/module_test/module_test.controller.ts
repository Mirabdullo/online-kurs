import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModuleTestService } from './module_test.service';
import { CreateModuleTestDto } from './dto/create-module_test.dto';
import { UpdateModuleTestDto } from './dto/update-module_test.dto';

@Controller('module-test')
export class ModuleTestController {
  constructor(private readonly moduleTestService: ModuleTestService) {}

  @Post()
  create(@Body() createModuleTestDto: CreateModuleTestDto) {
    return this.moduleTestService.create(createModuleTestDto);
  }

  @Get()
  findAll() {
    return this.moduleTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleTestDto: UpdateModuleTestDto) {
    return this.moduleTestService.update(+id, updateModuleTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleTestService.remove(+id);
  }
}
