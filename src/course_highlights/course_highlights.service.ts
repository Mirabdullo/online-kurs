import { InjectModel } from '@nestjs/sequelize';
import { CourseHighlight } from './entities/course_highlight.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCourseHighlightDto } from './dto/create-course_highlight.dto';
import { UpdateCourseHighlightDto } from './dto/update-course_highlight.dto';

@Injectable()
export class CourseHighlightsService {
  constructor(
    @InjectModel(CourseHighlight)
    private highlightRepository: typeof CourseHighlight,
  ) {}
  async create(createCourseHighlightDto: CreateCourseHighlightDto) {
    try {
      await this.highlightRepository.create(createCourseHighlightDto);
      return {
        statusCode: 201,
        message: 'Created',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.highlightRepository.findAll({
        attributes: ["id", 'course_id', 'highlight_id'],
        include: { all: true },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.highlightRepository.findByPk(id, {
        attributes: ["id", 'course_id', 'highlight_id'],
        include:{all: true}
      });
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateCourseHighlightDto: UpdateCourseHighlightDto) {
    try {
      const highlight = await this.highlightRepository.findByPk(id);
      if (!highlight)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      await this.highlightRepository.update(updateCourseHighlightDto, {
        where: { id: id },
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
      const highlight = await this.highlightRepository.findByPk(id);
      if (!highlight)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.highlightRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
