import { Test, TestingModule } from '@nestjs/testing';
import { BreakerPannelsUsersController } from './breaker-pannels-users.controller';
import { BreakerPannelsUsersService } from './breaker-pannels-users.service';

describe('BreakerPannelsUsersController', () => {
  let controller: BreakerPannelsUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreakerPannelsUsersController],
      providers: [BreakerPannelsUsersService],
    }).compile();

    controller = module.get<BreakerPannelsUsersController>(BreakerPannelsUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
