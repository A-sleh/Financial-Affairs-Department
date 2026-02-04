import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BreakerPannelsUser,
  Subscription_type,
} from '../breaker-pannels-users/entities/breaker-pannels-user.entity';
import { BreakerPannel } from '../breaker-pannel/entities/breaker-pannel.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BreakerPannelsUser)
    private readonly breakerPannelsUserRepository: Repository<BreakerPannelsUser>,
    @InjectRepository(BreakerPannel)
    private readonly breakerPannelRepository: Repository<BreakerPannel>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll(search: string) {
    return this.userRepository.findBy({
      full_name: search ? Like(`%${search}%`) : Like(`%%`),
    });
  }

  async findAllUsersDetails() {
    let users: BreakerPannelsUser[] =
      (await this.breakerPannelsUserRepository.find({
        relations: {
          user: true,
          breaker_pannel: true,
        },
      })) as BreakerPannelsUser[];

    return users.reduce((acc, curr) => {
      acc.push({
        ...curr.user,
        ...curr.breaker_pannel,
        subscribe_type: curr.subscribe_type,
        quantity: curr.quantity,
        counter_intial_value: curr.counter_intial_value,
      });
      return acc;
    }, [] as any[]);
  }

  async getUsersStats() {
    const UsersHasCounter = await this.breakerPannelsUserRepository.find({
      where: {
        subscribe_type: Subscription_type.counter,
      },
    });
    const UsersHasBreaker = await this.breakerPannelsUserRepository.find({
      where: {
        subscribe_type: Subscription_type.breaker,
      },
    });
    const breakerPannels = await this.breakerPannelRepository.count();

    return {
      UsersHasCounter: UsersHasCounter.length,
      UsersHasBreaker: UsersHasBreaker.length,
      breakerPannels,
      sellingAmpers: UsersHasBreaker.reduce((acc, curr) => {
        return acc + parseInt(curr.quantity);
      }, 0),
    };
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ user_id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let findUser = await this.userRepository.findOneBy({ user_id: id });

    if (!findUser) {
      throw new BadRequestException('User not found');
    }

    this.userRepository.update(id, updateUserDto);
    return { ...findUser, ...updateUserDto };
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
