import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyBillsService } from './weekly-bills.service';

describe('WeeklyBillsService', () => {
  let service: WeeklyBillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyBillsService],
    }).compile();

    service = module.get<WeeklyBillsService>(WeeklyBillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
