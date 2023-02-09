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
      await this.rateRepository.create(createRateDto)
      return {
        statusCode: 201,
        message: "Created"
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }



  async findAll() {
    try {
      return await this.rateRepository.findAll({attributes: ["student_id", "course_id", "rate", "description"], include: { all: true } })
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
        rating: totalAmount / data.length,
        descriptions
      }
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }



  async findOne(id: number) {
    try {
      const data = await this.rateRepository.findByPk(id, {attributes: ["student_id", "course_id", "rate", "description"], include: { all: true } })
      if (!data) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }
      return data
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: number, updateRateDto: UpdateRateDto) {
    try {
      const rate = await this.rateRepository.findByPk(id)
      if (!rate) return new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)

      return await this.rateRepository.update(updateRateDto, { where: { id: id }, returning: true })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const rate = await this.rateRepository.findByPk(id)
      if (!rate) return new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.rateRepository.destroy({ where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
