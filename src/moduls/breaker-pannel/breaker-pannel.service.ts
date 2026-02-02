import { InternalServerErrorException, Injectable, BadRequestException } from '@nestjs/common';
import { CreateBreakerPannelDto } from './dto/create-breaker-pannel.dto';
import { UpdateBreakerPannelDto } from './dto/update-breaker-pannel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BreakerPannel } from './entities/breaker-pannel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreakerPannelService {
  constructor(
    @InjectRepository(BreakerPannel)
    private readonly breakerPannelRepository: Repository<BreakerPannel>,
  ) {}

  create(createBreakerPannelDto: CreateBreakerPannelDto) {
    const breakerPannel = new BreakerPannel();

    breakerPannel.location = createBreakerPannelDto.location;
    breakerPannel.max_breakers = createBreakerPannelDto.max_breakers;

    try {
      const savedBreakerPannel =
        this.breakerPannelRepository.save(breakerPannel);
      return savedBreakerPannel;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create breaker pannel');
    }
  }

  findAll() {
    const allBreakerPannels = this.breakerPannelRepository.find();
    return allBreakerPannels;
  }

  async update(id: number, updateBreakerPannelDto: UpdateBreakerPannelDto) {
    const finded = await this.breakerPannelRepository.findOneBy({
      breaker_pannel_id: id,
    });

    if (!finded) {
      throw new BadRequestException('Breaker Pannel not found');
    }

    return this.breakerPannelRepository.update(id, updateBreakerPannelDto);
  }

  async remove(id: number) {
    const finded = await this.breakerPannelRepository.findOneBy({
      breaker_pannel_id: id,
    });

    if (!finded) {
      throw new BadRequestException('Breaker Pannel not found');
    }
    return this.breakerPannelRepository.delete(id);
  }
}
