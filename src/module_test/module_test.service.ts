import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateModuleTestDto } from './dto/create-module_test.dto';
import { UpdateModuleTestDto } from './dto/update-module_test.dto';
import { ModuleTests } from './entities/module_test.entity';

@Injectable()
export class ModuleTestService {
  constructor(
    @InjectModel(ModuleTests) private testRepository: typeof ModuleTests
  ){}
  async create(createModuleTestDto: CreateModuleTestDto) {
    try {
      const test = await this.testRepository.create(createModuleTestDto)
      return test
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.testRepository.findAll()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      return await this.testRepository.findByPk(id)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateModuleTestDto: UpdateModuleTestDto) {
    try {
      const test = await this.testRepository.findByPk(id)
      if(!test) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      
      return await this.testRepository.update(updateModuleTestDto,{where: {id: id}, returning: true})
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const test = await this.testRepository.findByPk(id)
      if(!test) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      
      return await this.testRepository.destroy({where: {id: id}})
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
