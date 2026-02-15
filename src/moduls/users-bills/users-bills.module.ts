import { Module } from '@nestjs/common';
import { UsersBillsService } from './users-bills.service';
import { UsersBillsController } from './users-bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersBill } from './entities/users-bill.entity';
import { User } from '../user/entities/user.entity';
import { WeeklyBill } from '../weekly-bills/entities/weekly-bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersBill,User,WeeklyBill])],
  controllers: [UsersBillsController],
  providers: [UsersBillsService],
})
export class UsersBillsModule {}
