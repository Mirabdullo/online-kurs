import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { Viewed } from './entities/viewed.entity';

@Injectable()
export class ViewedService {
  constructor(
    @InjectModel(Viewed) private viewedRepository: typeof Viewed
  ) {}
  create(createViewedDto: CreateViewedDto) {
    return this.viewedRepository.create(createViewedDto)
  }

  findAll() {
    return this.viewedRepository.findAll({include: {all: true}})
  }

  findOne(id: number) {
    return this.viewedRepository.findByPk(id,{include: {all: true}})
  }

  

  update(id: number, updateViewedDto: UpdateViewedDto) {
    return this.viewedRepository.update(updateViewedDto, {where: {id: id}})
  }

  remove(id: number) {
    return this.viewedRepository.destroy({where: {id: id}})
  }
}
