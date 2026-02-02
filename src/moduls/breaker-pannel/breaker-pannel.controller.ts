import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BreakerPannelService } from './breaker-pannel.service';
import { CreateBreakerPannelDto } from './dto/create-breaker-pannel.dto';
import { UpdateBreakerPannelDto } from './dto/update-breaker-pannel.dto';

@Controller('breaker-pannel')
export class BreakerPannelController {
  constructor(private readonly breakerPannelService: BreakerPannelService) {}

  @Post()
  create(@Body() createBreakerPannelDto: CreateBreakerPannelDto) {
    return this.breakerPannelService.create(createBreakerPannelDto);
  }

  @Get()
  findAll() {
    return this.breakerPannelService.findAll();
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body() updateBreakerPannelDto: UpdateBreakerPannelDto) {
    return this.breakerPannelService.update(+id, updateBreakerPannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breakerPannelService.remove(+id);
  }
}
