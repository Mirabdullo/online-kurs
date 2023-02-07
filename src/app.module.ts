import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { ModuleTestModule } from './module_test/module_test.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';

import { LessonModule } from './lesson/lesson.module';

import { RateModule } from './rate/rate.module';
import { EnrolledCourseModule } from './enrolled_course/enrolled_course.module';
import { LikedCourseModule } from './liked_course/liked_course.module';
import { ModulesModule } from './modules/modules.module';
import { Category } from './category/entities/category.entity';
import { ViewedModule } from './viewed/viewed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('POSTGRES_HOST') || '127.0.0.1',
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        models: [Category],
        autoLoadModels: true,
        // synchronize: true,
        logging: false,
      }),
    }),

    AdminsModule,
    StudentsModule,
    ModuleTestModule,
    CategoryModule,
    CourseModule,

    LessonModule,

    RateModule,

    EnrolledCourseModule,

    LikedCourseModule,

    ModulesModule,

    ViewedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
