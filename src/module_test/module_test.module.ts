import { Module } from '@nestjs/common';
import { ModuleTestService } from './module_test.service';
import { ModuleTestController } from './module_test.controller';

@Module({
  controllers: [ModuleTestController],
  providers: [ModuleTestService]
})
export class ModuleTestModule {}
