import { Test, TestingModule } from '@nestjs/testing';
import { BreakerPannelService } from './breaker-pannel.service';

describe('BreakerPannelService', () => {
  let service: BreakerPannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreakerPannelService],
    }).compile();

    service = module.get<BreakerPannelService>(BreakerPannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
