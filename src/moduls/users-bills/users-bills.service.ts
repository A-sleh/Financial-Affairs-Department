import { Injectable } from '@nestjs/common';
import { CreateUsersBillDto } from './dto/create-users-bill.dto';
import { UpdateUsersBillDto } from './dto/update-users-bill.dto';

@Injectable()
export class UsersBillsService {
  create(createUsersBillDto: CreateUsersBillDto) {
    return 'This action adds a new usersBill';
  }

  findAll() {
    return `This action returns all usersBills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersBill`;
  }

  update(id: number, updateUsersBillDto: UpdateUsersBillDto) {
    return `This action updates a #${id} usersBill`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersBill`;
  }
}
