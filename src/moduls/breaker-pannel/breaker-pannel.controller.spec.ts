import { Test, TestingModule } from '@nestjs/testing';
import { BreakerPannelController } from './breaker-pannel.controller';
import { BreakerPannelService } from './breaker-pannel.service';

describe('BreakerPannelController', () => {
  let controller: BreakerPannelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreakerPannelController],
      providers: [BreakerPannelService],
    }).compile();

    controller = module.get<BreakerPannelController>(BreakerPannelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
