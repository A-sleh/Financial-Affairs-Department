import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyBillsController } from './weekly-bills.controller';
import { WeeklyBillsService } from './weekly-bills.service';

describe('WeeklyBillsController', () => {
  let controller: WeeklyBillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyBillsController],
      providers: [WeeklyBillsService],
    }).compile();

    controller = module.get<WeeklyBillsController>(WeeklyBillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
