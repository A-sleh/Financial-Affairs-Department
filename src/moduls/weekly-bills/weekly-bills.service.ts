import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWeeklyBillDto } from './dto/create-weekly-bill.dto';
import { UpdateWeeklyBillDto } from './dto/update-weekly-bill.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { WeeklyBill } from './entities/weekly-bill.entity';
import { DataSource, Repository } from 'typeorm';
import { getDiffInDays } from '@/utils/helper';
import {
  BreakerPannelsUser,
  Subscription_type,
} from '../breaker-pannels-users/entities/breaker-pannels-user.entity';
import { UsersBill } from '../users-bills/entities/users-bill.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class WeeklyBillsService {
  constructor(
    @InjectRepository(WeeklyBill)
    private weeklyBillRepository: Repository<WeeklyBill>,
    @InjectRepository(BreakerPannelsUser)
    private breakerPannelsUserRepository: Repository<BreakerPannelsUser>,
    @InjectRepository(UsersBill)
    private usersBillRepository: Repository<UsersBill>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createWeeklyBillDto: CreateWeeklyBillDto) {
    const dateInMillseconds =
      new Date(createWeeklyBillDto.data).getTime() - Date.now();
    const latestWeeklyBill = await this.weeklyBillRepository.find({
      order: { date: 'DESC' },
      take: 1,
    });
    const users = await this.breakerPannelsUserRepository.find();

    if (dateInMillseconds < 0) {
      throw new BadRequestException('Date cannot be in the past');
    }

    if (latestWeeklyBill.length) {
      const latestDate = latestWeeklyBill[0].date;
      if (
        getDiffInDays(
          new Date(createWeeklyBillDto.data),
          new Date(latestDate),
        ) < 7
      ) {
        throw new BadRequestException(
          'Weekly bill already exists for this week',
        );
      }
    }
    const weeklyBill =
      await this.weeklyBillRepository.save(createWeeklyBillDto);
    const usersBillsToBeSaved: Omit<UsersBill, 'id'>[] = [];
    const lastWeekCounterValuesOfUsers = this.usersBillRepository.find({
      relations: {
        weekly_bill: true,
        user: true,
      },
      where: {
        // weekly_bill: {
        //   weekly_bill_id: latestWeeklyBill[0].weekly_bill_id,
        // },
        user: {
          subscribe_type: Subscription_type.counter,
        },
      },
    });
    return {lastWeekCounterValuesOfUsers,latestWeeklyBill};

    users.forEach((user) => {
      usersBillsToBeSaved.push({
        user,
        weekly_bill: weeklyBill,
        counter_value: null,
        payed_date: null,
        payed_amount: 0,
        last_counter_value: 1,
        total_required_price:
          user.subscribe_type == 'breaker'
            ? +user.quantity * weeklyBill.amper_price
            : null,
      });
    });
    this.usersBillRepository.save(usersBillsToBeSaved);
    return weeklyBill;
  }

  async findAll() {
    let usersWeeklyBillsNotPayed = await this.dataSource
      .getRepository(WeeklyBill)
      .createQueryBuilder('Users-bill')
      .leftJoinAndSelect('Users-bill.weekly_bill', 'weekly_bill')
      .select('weekly_bill.*')
      .addSelect('COUNT(weekly_bill.date)', 'users-not-payed')
      .where('payed_amount = 0')
      .groupBy('weekly_bill.date')
      .orderBy('weekly_bill.date', 'DESC')
      .getRawMany();
      
    return usersWeeklyBillsNotPayed;
  }

  async findOne(id: number) {
    const findWeeklyBill = await this.weeklyBillRepository.findOneBy({
      weekly_bill_id: id,
    });

    if (!findWeeklyBill) {
      throw new BadRequestException('Weekly bill not found');
    }

    const usersBill = await this.usersBillRepository.find({
      where: {
        weekly_bill: {
          weekly_bill_id: id,
        },
      },
      relations: {
        user: {
          user: true,
          breaker_pannel: true,
        },
      },
    });

    const users = usersBill.map((userBill) => {
      return {
        ...userBill.user.user,
        subscribe_type: userBill.user.subscribe_type,
        quantity: userBill.user.quantity,
        location: userBill.user.breaker_pannel.location,
        counter_intial_value: userBill.user.counter_intial_value,
        payed_date: userBill.payed_date,
        total_required_price: userBill.total_required_price,
        payed_amount: userBill.payed_amount,
        counter_value: userBill.counter_value,
      };
    });

    const totalUsers = await this.usersRepository.count();
    let totaleUsersInThisBill = usersBill?.length || 0,
      totaleUsersNotPayed = 0;
    usersBill.forEach((bill) => {
      totaleUsersNotPayed += Number(bill.payed_amount == 0);
    });

    return {
      totalUsers,
      totaleUsersInThisBill,
      totaleUsersNotPayed,
      totaleUsersPayed: totaleUsersInThisBill - totaleUsersNotPayed,
      users,
    };
  }

  async update(id: number, updateWeeklyBillDto: UpdateWeeklyBillDto) {
    const findWeeklyBill = await this.weeklyBillRepository.findOneBy({
      weekly_bill_id: id,
    });

    if (!findWeeklyBill) {
      throw new BadRequestException('Weekly bill not found');
    }

    return this.weeklyBillRepository.update(id, {
      amper_price:
        updateWeeklyBillDto?.amper_price || findWeeklyBill.amper_price,
      counter_price:
        updateWeeklyBillDto?.counter_price || findWeeklyBill.counter_price,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} weeklyBill`;
  }
}
