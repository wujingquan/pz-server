import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawalController } from './serverType.controller';
import { WithdrawalService } from './serverType.service';

describe('WithdrawalController', () => {
  let controller: WithdrawalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WithdrawalController],
      providers: [WithdrawalService],
    }).compile();

    controller = module.get<WithdrawalController>(WithdrawalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
