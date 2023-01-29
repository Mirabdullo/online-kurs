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
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        models: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        autoLoadModels: true,
        logging: false,
      }),
    }),

    AdminsModule,
    StudentsModule,
    ModuleTestModule,
    CategoryModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}