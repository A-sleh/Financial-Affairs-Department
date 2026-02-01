import { Test, TestingModule } from '@nestjs/testing';
import { UsersBillsController } from './users-bills.controller';
import { UsersBillsService } from './users-bills.service';

describe('UsersBillsController', () => {
  let controller: UsersBillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersBillsController],
      providers: [UsersBillsService],
    }).compile();

    controller = module.get<UsersBillsController>(UsersBillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
