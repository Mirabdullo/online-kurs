import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Modules } from './entities/module.entity';
import { FilesModule } from '../uploads/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Modules]),
    FilesModule
  ],
  controllers: [ModulesController],
  providers: [ModulesService]
})
export class ModulesModule {}
