import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rate } from './entities/rate.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Rate])
  ],
  controllers: [RateController],
  providers: [RateService]
})
export class RateModule {}
