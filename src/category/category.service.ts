import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      await this.categoryRepository.create(createCategoryDto);
      return {
        statusCode: 201,
        message: 'Created',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.findAll({
        attributes: ['id','category_name'],
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

}
