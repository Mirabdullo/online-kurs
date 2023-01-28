import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './entities/teacher.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Teacher]),
    JwtModule,
    TokensModule
  ],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
