import { Test, TestingModule } from '@nestjs/testing';
import { DisclaimerController } from './disclaimer.controller';
import { DisclaimerService } from './disclaimer.service';

describe('DisclaimerController', () => {
  let controller: DisclaimerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisclaimerController],
      providers: [DisclaimerService],
    }).compile();

    controller = module.get<DisclaimerController>(DisclaimerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
