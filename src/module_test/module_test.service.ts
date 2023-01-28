import { Injectable } from '@nestjs/common';
import { CreateModuleTestDto } from './dto/create-module_test.dto';
import { UpdateModuleTestDto } from './dto/update-module_test.dto';

@Injectable()
export class ModuleTestService {
  create(createModuleTestDto: CreateModuleTestDto) {
    return 'This action adds a new moduleTest';
  }

  findAll() {
    return `This action returns all moduleTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleTest`;
  }

  update(id: number, updateModuleTestDto: UpdateModuleTestDto) {
    return `This action updates a #${id} moduleTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleTest`;
  }
}
