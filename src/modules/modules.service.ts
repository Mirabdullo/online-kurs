import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../uploads/files.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules) private lessonRepository: typeof Modules,
    private readonly fileService: FilesService,
  ) {}
  async create(createModuleDto: CreateModuleDto, file: any) {
    try {
      const fileName = await this.fileService.createFile(file);
      const lesson = await this.lessonRepository.create({
        ...createModuleDto,
        image: fileName,
      });
      return lesson;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.lessonRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.lessonRepository.findByPk(id);
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateModuleDto: UpdateModuleDto, file: any) {
    try {
      const test = await this.lessonRepository.findByPk(id);
      if (!test)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      if (!file) {
        await this.fileService.removeFile(test.image);
        const fileName = await this.fileService.createFile(file);

        return await this.lessonRepository.update(
          {
            ...updateModuleDto,
            image: fileName,
          },
          {
            where: { id: id },
            returning: true,
          },
        );
      }
      return await this.lessonRepository.update(updateModuleDto, {
        where: { id: id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const test = await this.lessonRepository.findByPk(id);
      if (!test)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.lessonRepository.destroy({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
