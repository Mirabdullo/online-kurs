import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../uploads/files.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    private readonly fileService: FilesService
  ){}
  async create(createCourseDto: CreateCourseDto, file: any) {
    try {
      const fileName = await this.fileService.createFile(file)
      const course = await this.courseRepository.create({
        ...createCourseDto,
        image: fileName
      })
      return course
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.findAll({include: {all: true}})
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      return await this.courseRepository.findByPk(id, {include: {all: true}})
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto, file: any) {
    try {
      const course = await this.courseRepository.findByPk(id)
      if(!course) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      
      if(!file){
        await this.fileService.removeFile(course.image)
        const fileName = await this.fileService.createFile(file)

        return await this.courseRepository.update({
          ...updateCourseDto,
          image: fileName
        },{
          where: {id: id},
          returning: true
        })

        
      }
      return await this.courseRepository.update(updateCourseDto,{where: {id: id}, returning: true})
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const course = await this.courseRepository.findByPk(id)
      if(!course) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      
      return await this.courseRepository.destroy({where: {id: id}})
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
