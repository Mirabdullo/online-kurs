import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isArray } from 'class-validator';
import { FilesService } from '../uploads/files.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    private readonly fileService: FilesService,
  ) {}
  async create(createCourseDto: CreateCourseDto, files: any) {
    try {
      const file = [files.image[0], files.logo[0]]
      createCourseDto.price = Number(createCourseDto.price)
      
      if (file) {
        const fileName = await this.fileService.createFile(file);
        await this.courseRepository.create({
          ...createCourseDto,
          image: fileName[0].split('.')[1] !== 'svg' ? fileName[0] : fileName[1],
          logo: fileName[0].split('.')[1] === 'svg' ? fileName[0] : fileName[1],
        });
        return {
          statusCode: 201,
          message: 'Created',
        };
      } else {
        await this.courseRepository.create(createCourseDto);

        return {
          statusCode: 201,
          message: 'Created',
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.findAll({
        // attributes: ['id','category_id', 'title', 'description', 'image', 'price'],
        include:{all: true}
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      return await this.courseRepository.findByPk(id, {
        // attributes: ['id','category_id', 'title', 'description', 'image', 'price'],
        include:{all: true}
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, files: any) {
    try {
      const course = await this.courseRepository.findByPk(id);
      if (!course)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      if (!files) {
        const file = [files.image[0], files.logo[0]]
        await this.fileService.removeFile(course.image);
        const fileName = await this.fileService.createFile(file);
        if(fileName.length === 1 && fileName[0].split('.')[1] === 'svg'){
          return await this.courseRepository.update(
            {
              ...updateCourseDto,
              logo: fileName[0],
            },
            {
              where: { id: id },
            },
          );
        } else if(fileName.length === 1 && fileName[0].split('.')[1] !== 'svg'){
          return await this.courseRepository.update(
            {
              ...updateCourseDto,
              image: fileName[0]
            },
            {
              where: { id: id },
            },
          );
        } else {
          return await this.courseRepository.update(
            {
              ...updateCourseDto,
              image: fileName[0].split('.')[1] !== 'svg' ? fileName[0] : fileName[1],
              logo: fileName[0].split('.')[1] === 'svg' ? fileName[0] : fileName[1],
            },
            {
              where: { id: id },
            },
          );
        }

      }
      await this.courseRepository.update(updateCourseDto, {
        where: { id: id },
        returning: true,
      });

      return {
        statusCode: 200,
        message: "Updated"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const course = await this.courseRepository.findByPk(id);
      if (!course)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      return await this.courseRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
