import { Injectable } from '@nestjs/common';
import { CreateWeeklyBillDto } from './dto/create-weekly-bill.dto';
import { UpdateWeeklyBillDto } from './dto/update-weekly-bill.dto';

@Injectable()
export class WeeklyBillsService {
  create(createWeeklyBillDto: CreateWeeklyBillDto) {
    return 'This action adds a new weeklyBill';
  }

  findAll() {
    return `This action returns all weeklyBills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weeklyBill`;
  }

  update(id: number, updateWeeklyBillDto: UpdateWeeklyBillDto) {
    return `This action updates a #${id} weeklyBill`;
  }

  remove(id: number) {
    return `This action removes a #${id} weeklyBill`;
  }
}
