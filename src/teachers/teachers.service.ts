import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { TokensService } from '../tokens/tokens.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-auth.dto';
import { Response } from 'express';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher) private teacherRepository: typeof Teacher,
    private readonly tokenService: TokensService,
  ) {}
  async signup(createTeacherDto: CreateTeacherDto, res: Response) {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { email: createTeacherDto.email },
      });
      if (teacher) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }

      const hashedPassword = await bcrypt.hash(createTeacherDto.password, 7);

      const newTeacher = await this.teacherRepository.create({
        ...createTeacherDto,
        password: hashedPassword,
      });

      const tokens = await this.tokenService.getTokens(
        newTeacher.id,
        newTeacher.email,
        newTeacher.is_active,
      );

      await this.tokenService.updateRefreshTokenHash(
        newTeacher.id,
        tokens.refresh_token,
        this.teacherRepository,
      );

      await this.tokenService.writeCookie(tokens.refresh_token, res);

      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async signin(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;

      const teacher = await this.teacherRepository.findOne({
        where: { email: email },
      });

      if (!email)
        throw new BadRequestException(
          "Ma'lumotlar topilmadi ro'yxatdan o'ting",
        );

      const passwordMatches = await bcrypt.compare(password, teacher.password);
      if (!passwordMatches)
        throw new BadRequestException("Email yoki password noto'g'ri");

      const tokens = await this.tokenService.getTokens(
        teacher.id,
        teacher.email,
        teacher.is_active,
      );

      await this.tokenService.updateRefreshTokenHash(
        teacher.id,
        tokens.refresh_token,
        this.teacherRepository,
      );

      await this.tokenService.writeCookie(tokens.refresh_token, res);

      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async logout(id: number) {
    try {
      const teacher = await this.teacherRepository.findByPk(id);
      if (!teacher) throw new BadRequestException("Id noto'g'ri");
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.teacherRepository.findAll({});
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.teacherRepository.findByPk(id, {
        paranoid: false,
        include: { all: true },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const teacher = await this.teacherRepository.findByPk(id);
      if (!teacher) throw new BadRequestException("Id noto'g'ri");

      return await this.teacherRepository.update(updateTeacherDto, {
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const teacher = await this.teacherRepository.findByPk(id);
      if (!teacher) throw new BadRequestException("Ma'lumotlar topilmadi");

      await this.teacherRepository.destroy({
        where: { id },
      });

      return {
        status: 200,
        message: 'Deleted',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
