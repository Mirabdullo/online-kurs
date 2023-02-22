import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { Viewed } from './entities/viewed.entity';

@Injectable()
export class ViewedService {
  constructor(@InjectModel(Viewed) private viewedRepository: typeof Viewed) {}

  async create(createViewedDto: CreateViewedDto) {
    try {
      await this.viewedRepository.create(createViewedDto);

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
      return await this.viewedRepository.findAll({ attributes: ['id', 'student_id', 'course_id', 'module_id', 'lesson_id', 'viewed'] });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      return await this.viewedRepository.findByPk(id, {
        attributes: ['id', 'student_id', 'course_id', 'module_id', 'lesson_id', 'viewed']
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateViewedDto: UpdateViewedDto) {
    try {
      await this.viewedRepository.update(updateViewedDto, {
        where: { id: id },
      });

      return {
        statusCode: 200,
        message: "Updated"
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      return await this.viewedRepository.destroy({ where: { id: id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
