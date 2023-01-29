import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly tokenService: TokensService,
  ) {}
  async signup(createAdminDto: CreateAdminDto, res: Response) {
    try {
      const condidate = await this.adminRepository.findOne({
        where: { email: createAdminDto.email },
      });
      if (condidate) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }

      const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);

      const admin = await this.adminRepository.create({
        ...createAdminDto,
        password: hashedPassword,
      });

      const tokens = await this.tokenService.getTokens(
        admin.id,
        admin.email,
        admin.is_active,
      );

      await this.tokenService.updateRefreshTokenHash(
        admin.id,
        tokens.refresh_token,
        this.adminRepository,
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

      const admin = await this.adminRepository.findOne({
        where: { email: email },
      });

      if (!email)
        throw new BadRequestException(
          "Ma'lumotlar topilmadi ro'yxatdan o'ting",
        );

      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches)
        throw new BadRequestException("Email yoki password noto'g'ri");

      const tokens = await this.tokenService.getTokens(
        admin.id,
        admin.email,
        admin.is_active,
      );

      await this.tokenService.updateRefreshTokenHash(
        admin.id,
        tokens.refresh_token,
        this.adminRepository,
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
      return await this.adminRepository.findAll({ include: { all: true } });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.adminRepository.findByPk(id, {
        paranoid: false,
        include: { all: true },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.adminRepository.findByPk(id);
      if (!admin) throw new BadRequestException("Id noto'g'ri");

      return await this.adminRepository.update(updateAdminDto, {
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const admin = await this.adminRepository.findByPk(id);
      if (!admin) throw new BadRequestException("Ma'lumotlar topilmadi");

      await this.adminRepository.destroy({
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