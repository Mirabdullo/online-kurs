import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { LoginDto } from './dto/login-auth.dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly tokenService: TokensService,
  ) {}
  async signup(createStudentDto: CreateStudentDto, res: Response) {
    try {
      const student = await this.studentRepository.findOne({
        where: { email: createStudentDto.email },
      });
      if (student) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }
      const hashedPassword = await bcrypt.hash(createStudentDto.password, 7);

      const newStudent = await this.studentRepository.create({
        ...createStudentDto,
        password: hashedPassword,
      });

      const tokens = await this.tokenService.getTokens(
        newStudent.id,
        newStudent.email,
        newStudent.is_active,
      );

      await this.tokenService.updateRefreshTokenHash(
        newStudent.id,
        tokens.refresh_token,
        this.studentRepository,
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

      const student = await this.studentRepository.findOne({
        where: { email: email },
      });

      if (!email)
        throw new BadRequestException(
          "Ma'lumotlar topilmadi ro'yxatdan o'ting",
        );

      const passwordMatches = await bcrypt.compare(password, student.password);
      if (!passwordMatches)
        throw new BadRequestException("Email yoki password noto'g'ri");

      const tokens = await this.tokenService.getTokens(
        student.id,
        student.email,
        student.is_active,
      );

      await this.tokenService.updateRefreshTokenHash(
        student.id,
        tokens.refresh_token,
        this.studentRepository,
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

  async findAll() {
    try {
      return await this.studentRepository.findAll({ include: { all: true } });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.studentRepository.findByPk(id, {
        paranoid: false,
        include: { all: true },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.studentRepository.findByPk(id);
      if (!student) throw new BadRequestException("Id noto'g'ri");

      return await this.studentRepository.update(updateStudentDto, {
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findByPk(id);
      if (!student) throw new BadRequestException("Ma'lumotlar topilmadi");

      await this.studentRepository.destroy({
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
