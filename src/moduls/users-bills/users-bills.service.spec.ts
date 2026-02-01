import { Test, TestingModule } from '@nestjs/testing';
import { UsersBillsService } from './users-bills.service';

describe('UsersBillsService', () => {
  let service: UsersBillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersBillsService],
    }).compile();

    service = module.get<UsersBillsService>(UsersBillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
