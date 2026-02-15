import { Module } from '@nestjs/common';
import { WeeklyBillsService } from './weekly-bills.service';
import { WeeklyBillsController } from './weekly-bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyBill } from './entities/weekly-bill.entity';
import { BreakerPannelsUser } from '../breaker-pannels-users/entities/breaker-pannels-user.entity';
import { UsersBill } from '../users-bills/entities/users-bill.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeeklyBill, BreakerPannelsUser, UsersBill,User]),
  ],
  controllers: [WeeklyBillsController],
  providers: [WeeklyBillsService],
})
export class WeeklyBillsModule {}
