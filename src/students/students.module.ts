import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Student } from "./entities/student.entity";
import { JwtModule } from "@nestjs/jwt";
import { TokensModule } from "../tokens/tokens.module";

@Module({
  imports: [SequelizeModule.forFeature([Student]), TokensModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
