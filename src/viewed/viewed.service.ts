import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { Viewed } from './entities/viewed.entity';

@Injectable()
export class ViewedService {
  constructor(
    @InjectModel(Viewed) private viewedRepository: typeof Viewed
  ) {}
 
  async create(createViewedDto: CreateViewedDto) {
    try {
      await this.viewedRepository.create(createViewedDto)
    
      return {
        statusCode: 201,
        message: "Created"
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.viewedRepository.findAll({include: {all: true}})
    
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      return await this.viewedRepository.findByPk(id,{include: {all: true}})
    
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  

  async update(id: number, updateViewedDto: UpdateViewedDto) {
    try {
      return await this.viewedRepository.update(updateViewedDto, {where: {id: id}})
    
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      return await this.viewedRepository.destroy({where: {id: id}})
    
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }
}
