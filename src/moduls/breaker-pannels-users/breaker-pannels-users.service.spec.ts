import { Test, TestingModule } from '@nestjs/testing';
import { BreakerPannelsUsersService } from './breaker-pannels-users.service';

describe('BreakerPannelsUsersService', () => {
  let service: BreakerPannelsUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreakerPannelsUsersService],
    }).compile();

    service = module.get<BreakerPannelsUsersService>(BreakerPannelsUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
