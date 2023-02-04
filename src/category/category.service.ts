import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category) { }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.create(createCategoryDto)
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.findAll({ include: { all: true } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async findOne(id: number) {
    try {
      const data = await this.categoryRepository.findByPk(id)
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }
      return data
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const test = await this.categoryRepository.findByPk(id)
      if (!test) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)

      return await this.categoryRepository.update(updateCategoryDto, { where: { id: id }, returning: true })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const test = await this.categoryRepository.findByPk(id)
      if (!test) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.categoryRepository.destroy({ where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
