import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  BreakerPannelsInfo,
  CreateBreakerPannelsUserDto,
  PannelStatDto,
} from './dto/create-breaker-pannels-user.dto';
import { UpdateBreakerPannelsUserDto } from './dto/update-breaker-pannels-user.dto';
import { User } from '../user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { BreakerPannelsUser } from './entities/breaker-pannels-user.entity';
import { BreakerPannel } from '../breaker-pannel/entities/breaker-pannel.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { subscribe } from 'diagnostics_channel';

@Injectable()
export class BreakerPannelsUsersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BreakerPannelsUser)
    private readonly breakerPannelsUserRepository: Repository<BreakerPannelsUser>,
    @InjectRepository(BreakerPannel)
    private readonly breakerPannelRepository: Repository<BreakerPannel>,
  ) {}

  async create(userInfo: CreateBreakerPannelsUserDto) {
    const findeBreakerPannel = await this.breakerPannelRepository.findOneBy({
      breaker_pannel_id: userInfo.breaker_pannel_id,
    });

    if (!findeBreakerPannel) {
      throw new BadRequestException('Breaker Pannel not found');
    }

    if (!userInfo.full_name || !userInfo.phone) {
      throw new BadRequestException('Full name and phone are required');
    }

    if (!userInfo.subscribe_type) {
      throw new BadRequestException('Subscribe type is required');
    }

    const user = new User();

    user.full_name = userInfo.full_name;
    user.phone = userInfo.phone;

    await this.userRepository.save(user);

    const breakerPannelsUser = new BreakerPannelsUser();
    breakerPannelsUser.user = user;
    breakerPannelsUser.breaker_pannel = findeBreakerPannel;
    breakerPannelsUser.subscribe_type = userInfo.subscribe_type;
    breakerPannelsUser.quantity = userInfo.quantity;
    breakerPannelsUser.counter_intial_value = userInfo.counter_intial_value;
    try {
      await this.breakerPannelsUserRepository.save(breakerPannelsUser);
    } catch (error) {
      throw new InternalServerErrorException(
        "The breaker pannel information doesn' saved",
      );
    }

    return breakerPannelsUser;
  }

  async findAll(): Promise<BreakerPannelsInfo[]> {
    const breakerPannelsUsers = await this.dataSource
      .getRepository(BreakerPannelsUser)
      .createQueryBuilder('breaker-pannels-user')
      .leftJoinAndSelect('breaker-pannels-user.user', 'user')
      .leftJoinAndSelect(
        'breaker-pannels-user.breaker_pannel',
        'breaker_pannel',
      )
      .getMany();

    const breakerPannelsUserInfoMap: Map<number, any[]> = new Map();
    const breakerPannelsInfoMap: Map<number, boolean> = new Map();

    for (const bpu of breakerPannelsUsers) {
      const bpId = bpu.breaker_pannel.breaker_pannel_id;
      const userInfo = {
        id: bpu.user.user_id,
        full_name: bpu.user.full_name,
        phone: bpu.user.phone,
        subscribe_type: bpu.subscribe_type,
        quantity: bpu.quantity,
        counter_intial_value: bpu.counter_intial_value,
      };

      if (!breakerPannelsUserInfoMap.get(bpId)) {
        breakerPannelsUserInfoMap.set(bpId, [userInfo]);
      } else breakerPannelsUserInfoMap.get(bpId)?.push(userInfo);
    }

    return breakerPannelsUsers.map((bpu) => {
      const bpId = bpu.breaker_pannel.breaker_pannel_id;
      if (!breakerPannelsInfoMap.get(bpId)) {
        breakerPannelsInfoMap.set(bpId, true);
        return {
          breaker_pannel_id: bpu.breaker_pannel.breaker_pannel_id,
          location: bpu.breaker_pannel.location,
          max_breakers: bpu.breaker_pannel.max_breakers,
          users: breakerPannelsUserInfoMap.get(bpId),
        };
      }
    }) as BreakerPannelsInfo[];
  }

  async getAllPannelsStat(search: string) {
    let breakerPannelsUsers = await this.dataSource
      .getRepository(BreakerPannelsUser)
      .createQueryBuilder('breaker-pannels-user')
      .leftJoinAndSelect('breaker-pannels-user.user', 'user')
      .leftJoinAndSelect(
        'breaker-pannels-user.breaker_pannel',
        'breaker_pannel',
      )
      .where('lower(location) like :search ', {
        search: `%${search?.toLowerCase() || ''}%`,
      })
      .getMany();

    return this.getBreakerState(breakerPannelsUsers);
  }

  async findOne(id: number) {
    let breakerPannelUsers = await this.dataSource
      .getRepository(BreakerPannelsUser)
      .createQueryBuilder('breaker-pannels-user')
      .leftJoinAndSelect('breaker-pannels-user.user', 'user')
      .leftJoinAndSelect(
        'breaker-pannels-user.breaker_pannel',
        'breaker_pannel',
      )
      .where('breaker_pannel_id = :id', { id })
      .getMany();
    return {
      ...this.getBreakerState(breakerPannelUsers)[0],
      users: breakerPannelUsers.reduce((acc, bpu) => {
        acc.push({
          ...bpu.user,
          subscribe_type: bpu.subscribe_type,
          quantity: bpu.quantity,
          counter_intial_value: bpu.counter_intial_value,
        });
        return acc;
      }, [] as any[]),
    };
  }

  async update(
    id: number,
    updateBreakerPannelsUserDto: UpdateBreakerPannelsUserDto,
  ) {
    let breakerPannelUser = await this.dataSource
      .getRepository(BreakerPannelsUser)
      .createQueryBuilder('breaker-pannels-user')
      .leftJoinAndSelect('breaker-pannels-user.user', 'user')
      .leftJoinAndSelect(
        'breaker-pannels-user.breaker_pannel',
        'breaker_pannel',
      )
      .where('user_id = :id', { id })
      .getOne();
    let newBreakerid = await this.breakerPannelRepository.findOneBy({
      breaker_pannel_id: updateBreakerPannelsUserDto.breaker_pannel_id,
    });

    if (!breakerPannelUser || !newBreakerid) {
      throw new BadRequestException('Breaker Pannel not found');
    }
    breakerPannelUser.breaker_pannel = newBreakerid

    return this.breakerPannelsUserRepository.update(breakerPannelUser?.id,breakerPannelUser);
  }

  remove(id: number) {
    return `This action removes a #${id} breakerPannelsUser`;
  }

  /**
   *
   *  HELPERS
   *
   */
  getBreakerState(breakerPannelsUsers: BreakerPannelsUser[]) {
    let result = new Map<number, PannelStatDto>();
    breakerPannelsUsers.forEach((bpu) => {
      const bpId = bpu.breaker_pannel.breaker_pannel_id;
      if (!result.get(bpId)) {
        result.set(bpId, {
          breaker_pannel_id: bpu.breaker_pannel.breaker_pannel_id,
          location: bpu.breaker_pannel.location,
          total_users: 1,
          total_ameper: bpu.subscribe_type === 'breaker' ? +bpu?.quantity : 0,
          total_counter_users: bpu.subscribe_type === 'counter' ? 1 : 0,
          max_breakers: bpu.breaker_pannel.max_breakers,
        });
      } else {
        const pannelStat: PannelStatDto = result.get(bpId) as PannelStatDto;
        pannelStat.total_users += 1;
        pannelStat.total_ameper +=
          bpu.subscribe_type === 'breaker' ? +bpu?.quantity : 0;
        pannelStat.total_counter_users +=
          bpu.subscribe_type === 'counter' ? 1 : 0;
        result.set(bpId, pannelStat);
      }
    });

    return Array.from(result.values());
  }
}
