import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeeklyBillsService } from './weekly-bills.service';
import { CreateWeeklyBillDto } from './dto/create-weekly-bill.dto';
import { UpdateWeeklyBillDto } from './dto/update-weekly-bill.dto';

@Controller('weekly-bills')
export class WeeklyBillsController {
  constructor(private readonly weeklyBillsService: WeeklyBillsService) {}

  @Post()
  create(@Body() createWeeklyBillDto: CreateWeeklyBillDto) {
    return this.weeklyBillsService.create(createWeeklyBillDto);
  }

  @Get()
  findAll() {
    return this.weeklyBillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeklyBillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeeklyBillDto: UpdateWeeklyBillDto) {
    return this.weeklyBillsService.update(+id, updateWeeklyBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weeklyBillsService.remove(+id);
  }
}
