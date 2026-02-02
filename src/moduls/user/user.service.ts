import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BreakerPannelsUser } from '../breaker-pannels-users/entities/breaker-pannels-user.entity';
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
    const findeBreakerPannel = await this.breakerPannelRepository.findOneBy({
      breaker_pannel_id: createUserDto.breaker_pannel_id,
    });

    console.log(findeBreakerPannel);

    if (!findeBreakerPannel) {
      throw new BadRequestException('Breaker Pannel not found');
    }

    const user = new User();

    user.full_name = createUserDto.full_name;
    user.phone = createUserDto.phone;

    this.userRepository.save(user);

    const breakerPannelsUser = new BreakerPannelsUser();
    breakerPannelsUser.users = user;
    breakerPannelsUser.breaker_pannels = findeBreakerPannel;
    breakerPannelsUser.subscribe_type = createUserDto.subscribe_type;
    breakerPannelsUser.quantity = createUserDto.quantity;
    breakerPannelsUser.counter_intial_value =
      createUserDto.counter_intial_value;

    this.breakerPannelsUserRepository.save(breakerPannelsUser);

    return breakerPannelsUser;
  }   

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
