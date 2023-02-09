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
      await this.categoryRepository.create(createCategoryDto)
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
      return await this.categoryRepository.findAll({ attributes: ["category_name"] })
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async findOne(id: number) {
    try {
      const data = await this.categoryRepository.findByPk(id,{ attributes: ["category_name"] })
      if (!data) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }
      return data
    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const test = await this.categoryRepository.findByPk(id)
      if (!test) return new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)

      return await this.categoryRepository.update(updateCategoryDto, { where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const test = await this.categoryRepository.findByPk(id)
      if (!test) return new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.categoryRepository.destroy({ where: { id: id } })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
