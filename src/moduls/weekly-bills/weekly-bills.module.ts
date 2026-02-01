import { Module } from '@nestjs/common';
import { WeeklyBillsService } from './weekly-bills.service';
import { WeeklyBillsController } from './weekly-bills.controller';

@Module({
  controllers: [WeeklyBillsController],
  providers: [WeeklyBillsService],
})
export class WeeklyBillsModule {}
