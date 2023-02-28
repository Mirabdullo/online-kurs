import { CourseService } from './../course/course.service';
import { LessonService } from './../lesson/lesson.service';
import { ModulesService } from './../modules/modules.service';
import { HttpException, Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { Viewed } from './entities/viewed.entity';

@Injectable()
export class ViewedService {
  constructor(
    @InjectModel(Viewed) private viewedRepository: typeof Viewed,
    private readonly courseService: CourseService
  ) {}

  async create(createViewedDto: CreateViewedDto) {
    try {
      const data = await this.viewedRepository.findOne({where: {student_id: createViewedDto.student_id, course_id: createViewedDto.course_id}})
      if(!data){
        const data1 = await this.viewedRepository.create({
          student_id: createViewedDto.student_id,
          course_id: createViewedDto.course_id,
          modules: [createViewedDto.module_id],
          lessons: [createViewedDto.lesson_id]
        });
      } else {
        
        let modules = data.dataValues.modules
        let lessons = data.dataValues.lessons
        if(!data.modules.includes(createViewedDto.module_id)){
          modules = [...modules, createViewedDto.module_id]
          console.log(modules);
        }
        if(!data.lessons.includes(createViewedDto.lesson_id)){
          lessons = [...lessons, createViewedDto.lesson_id]
          console.log(lessons);
        }

        console.log("modules: ", modules);
        console.log("lessons: ", lessons);
        await this.viewedRepository.update({
          modules: modules,
          lessons: lessons
        }, {where: {id: data.id}})
        return {
          statusCode: 200,
          message: "Updated"
        }
      }
   
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
      return await this.viewedRepository.findAll({ attributes: ['id', 'student_id', 'course_id', 'modules', 'lessons'] });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.viewedRepository.findOne({where: {id: id}});
      console.log(data.dataValues);
      const lessons = await this.courseService.findOne(data.course_id)
      console.log(lessons.lessons);
      console.log(data.lessons);
      const viewed = (100 / lessons.lessons) * data.lessons.length
      return viewed.toFixed()
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
