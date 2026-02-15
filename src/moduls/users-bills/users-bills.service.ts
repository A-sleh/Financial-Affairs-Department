import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsersBillDto } from './dto/create-users-bill.dto';
import { UpdateUsersCounterValues } from './dto/update-users-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersBill } from './entities/users-bill.entity';
import { WeeklyBill } from '../weekly-bills/entities/weekly-bill.entity';
import { User } from '../user/entities/user.entity';
import { Subscription_type } from '../breaker-pannels-users/entities/breaker-pannels-user.entity';

@Injectable()
export class UsersBillsService {
  constructor(
    @InjectRepository(UsersBill)
    private usersBillRepository: Repository<UsersBill>,
    @InjectRepository(WeeklyBill)
    private weeklyBillRepository: Repository<WeeklyBill>,
  ) {}

  create(createUsersBillDto: CreateUsersBillDto) {
    return this.usersBillRepository.save(createUsersBillDto);
  }

  findAll() {
    return this.usersBillRepository.find({
      relations: {
        user: true,
        weekly_bill: true,
      },
    });
  }

  async findOne(id: number) {
    return `This action findOne a #${id} usersBill`;
  }

  async update(
    weeklyBillId: number,
    updateUsersBillDto: UpdateUsersCounterValues,
  ) {
    const findWeeklyBill = await this.weeklyBillRepository.findOneBy({
      weekly_bill_id: weeklyBillId,
    });

    if (!findWeeklyBill) {
      throw new BadRequestException('Weekly bill not found');
    }
    const userCounterSubscription = await this.usersBillRepository.find({
      relations: {
        user: {
          user: true,
        },
      },
      where: {
        weekly_bill: {
          weekly_bill_id: weeklyBillId,
        },
        user: {
          subscribe_type: Subscription_type.counter,
        },
      },
    });

    // Update each user bill individually
    for (const userBill of userCounterSubscription) {
      await this.usersBillRepository.update(userBill.id, {
        total_required_price: userBill.total_required_price,
        payed_amount: userBill.payed_amount,
        counter_value: Number(
          updateUsersBillDto[userBill.user.user.user_id] ||
            userBill.counter_value,
        ),
      });
    }
    return userCounterSubscription;
  }

  remove(id: number) {
    return `This action removes a #${id} usersBill`;
  }
}
