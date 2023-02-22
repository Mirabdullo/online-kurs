import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-auth.dto';
import { TokensService } from '../tokens/tokens.service';
import { Json } from 'sequelize/types/utils';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly tokenService: TokensService,
    private readonly jwtService: JwtService
  ) {}

  // Registrate studen ////////
  async signup(
    createStudentDto: CreateStudentDto,
    res: Response,
    req: Request,
  ) {
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
        id: newStudent.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  // SIGNIN student ///////////////////
  async signin(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;

      const student = await this.studentRepository.findOne({
        where: { email: email },
      });

      if (!email) throw new BadRequestException("Email not'g'ri");

      const passwordMatches = await bcrypt.compare(password, student.password);
      if (!passwordMatches) throw new BadRequestException("Password noto'g'ri");

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
      throw new HttpException(error.message, error.status);
    }
  }

  // LOGOUT student / / / / // / / /
  async logout(id: string, req: Request) {
    try {
      console.log(req);
      const admin = await this.studentRepository.findByPk(id);
      if (!admin) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      return await this.studentRepository.update(
        {
          is_active: false,
        },
        { where: { id: id } },
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  // All students
  async findAll() {
    try {
      return await this.studentRepository.findAll({
        attributes: ['id','first_name', 'last_name', 'email'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  // STUDENT findone
  async findOne(id: string) {
    try {
      return await this.studentRepository.findByPk(id, {
        paranoid: false,
        attributes: ['id','first_name', 'last_name', 'email'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  // Update studen data
  async update(id: string, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.studentRepository.findByPk(id);
      if (!student) throw new BadRequestException("Student not found");

      await this.studentRepository.update(updateStudentDto, {
        where: { id },
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

  // REMOVE student //////////
  async remove(id: string) {
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
      throw new HttpException(error.message, error.status);
    }
  }







  async refreshToken(token: string, res: Response){
    try {
      if(!token){
        throw new HttpException("Token Not Found", HttpStatus.NOT_FOUND)
      }
      const data = await this.jwtService.verify(token['token'],{secret: process.env.REFRESH_TOKEN_KEY})
      console.log(data);
      const student = await this.studentRepository.findByPk(data.sub)
      console.log(student);
      if(!student){
        throw new HttpException("Unauthorized", HttpStatus.NOT_FOUND)
      }
      console.log(student.refresh_token);
      const matchesToken = await bcrypt.compare(token['token'], student.refresh_token)
      console.log(matchesToken);
      if(!matchesToken){
        throw new HttpException("Ruxsat etilmagan foydalanuvchi", HttpStatus.BAD_GATEWAY)
      }

      const tokens = await this.tokenService.getTokens(
        student.id,
        student.email,
        student.is_active,
      );

      student.refresh_token = tokens.refresh_token
      student.save()

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
      throw new HttpException(error.message, error.status)
    }
  }










}
