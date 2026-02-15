import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersBillsService } from './users-bills.service';
import { CreateUsersBillDto } from './dto/create-users-bill.dto';
import type { UpdateUsersCounterValues } from './dto/update-users-bill.dto';

@Controller('users-bills')
export class UsersBillsController {
  constructor(private readonly usersBillsService: UsersBillsService) {}

  @Post()
  create(@Body() createUsersBillDto: CreateUsersBillDto) {
    return this.usersBillsService.create(createUsersBillDto);
  }

  @Get()
  findAll() {
    return this.usersBillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersBillsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersBillDto: UpdateUsersCounterValues,
  ) {
    return this.usersBillsService.update(+id, updateUsersBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersBillsService.remove(+id);
  }
}
