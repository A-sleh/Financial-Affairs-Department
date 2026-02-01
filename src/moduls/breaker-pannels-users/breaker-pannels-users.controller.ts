import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreakerPannelsUsersService } from './breaker-pannels-users.service';
import { CreateBreakerPannelsUserDto } from './dto/create-breaker-pannels-user.dto';
import { UpdateBreakerPannelsUserDto } from './dto/update-breaker-pannels-user.dto';

@Controller('breaker-pannels-users')
export class BreakerPannelsUsersController {
  constructor(private readonly breakerPannelsUsersService: BreakerPannelsUsersService) {}

  @Post()
  create(@Body() createBreakerPannelsUserDto: CreateBreakerPannelsUserDto) {
    return this.breakerPannelsUsersService.create(createBreakerPannelsUserDto);
  }

  @Get()
  findAll() {
    return this.breakerPannelsUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breakerPannelsUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreakerPannelsUserDto: UpdateBreakerPannelsUserDto) {
    return this.breakerPannelsUsersService.update(+id, updateBreakerPannelsUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breakerPannelsUsersService.remove(+id);
  }
}
