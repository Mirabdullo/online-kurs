import { CategoryService } from './../category/category.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../uploads/files.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    private readonly fileService: FilesService,
    private readonly categoryService: CategoryService
  ) {}
  async create(createCourseDto: CreateCourseDto, files: any) {
    try {
      createCourseDto.price = Number(createCourseDto.price)
        let upload_image: string = ''
        let upload_logo: string = ''
        if(files.image){
          upload_image = await this.fileService.createFile(files.image[0])         
        }
  
        if(files.logo){
          upload_logo = await this.fileService.createFile(files.logo[0])
        }

        if(!(await this.categoryService.findOne(createCourseDto.category_id))){
          throw new BadRequestException("category_id does not matched")
        }
        await this.courseRepository.create({
          ...createCourseDto,
          image: upload_image,
          logo: upload_logo,
        });
        return {
          statusCode: 201,
          message: 'Created',
        };



    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.findAll({
        include:{all: true}
      });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findByCategory(id: string){
    try {
      const courses = await this.courseRepository.findAll({where: {category_id: id}})
      return courses
    } catch (error) {
      console.log(error);
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(id: string) {
    try {
      return await this.courseRepository.findByPk(id, {
        include:{all: true}
      });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, files: any) {
    try {
      const course = await this.courseRepository.findByPk(id);
      if (!course)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      if (!files) {
        let upload_image: string = ''
        let upload_logo: string = ''
        if(files.image){
          upload_image = await this.fileService.createFile(files.image[0])         
        }
  
        if(files.logo){
          upload_logo = await this.fileService.createFile(files.logo[0])
        }

          await this.courseRepository.update(
            {
              ...updateCourseDto,
              image: upload_image,
              logo: upload_logo,
            },
            {
              where: { id: id },
            },
          );

          return {
            statusCode: 200,
            message: "Updated"
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
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
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
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
