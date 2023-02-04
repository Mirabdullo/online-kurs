import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Rate } from './entities/rate.entity';

@Injectable()
export class RateService {
  constructor(@InjectModel(Rate) private rateRepository: typeof Rate) { }
  async create(createRateDto: CreateRateDto) {
    try {
      return await this.rateRepository.create(createRateDto)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }



  async findAll() {
    try {
      return await this.rateRepository.findAll({ include: { all: true } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }


  async rateCourse(id:number){
    try {
      const data = await this.rateRepository.findAll({where: {course_id: id}})
      let totalAmount = 0
      let descriptions = []
      data.forEach(item => {
        totalAmount += item.rate
        descriptions.push(item.description)
      })

      return {
        rating: totalAmount / data.length--,
        descriptions
      }
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }



  async findOne(id: number) {
    try {
      const data = await this.rateRepository.findByPk(id)
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }
      return data
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: number, updateRateDto: UpdateRateDto) {
    try {
      const rate = await this.rateRepository.findByPk(id)
      if (!rate) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)

      return await this.rateRepository.update(updateRateDto, { where: { id: id }, returning: true })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const rate = await this.rateRepository.findByPk(id)
      if (!rate) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.rateRepository.destroy({ where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
