import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsController } from './highlights.controller';
import { Highlight } from './entities/highlight.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Highlight])
  ],
  controllers: [HighlightsController],
  providers: [HighlightsService]
})
export class HighlightsModule {}
