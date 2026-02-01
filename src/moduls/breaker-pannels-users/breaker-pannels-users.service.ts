import { Injectable } from '@nestjs/common';
import { CreateBreakerPannelsUserDto } from './dto/create-breaker-pannels-user.dto';
import { UpdateBreakerPannelsUserDto } from './dto/update-breaker-pannels-user.dto';

@Injectable()
export class BreakerPannelsUsersService {
  create(createBreakerPannelsUserDto: CreateBreakerPannelsUserDto) {
    return 'This action adds a new breakerPannelsUser';
  }

  findAll() {
    return `This action returns all breakerPannelsUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} breakerPannelsUser`;
  }

  update(id: number, updateBreakerPannelsUserDto: UpdateBreakerPannelsUserDto) {
    return `This action updates a #${id} breakerPannelsUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} breakerPannelsUser`;
  }
}
