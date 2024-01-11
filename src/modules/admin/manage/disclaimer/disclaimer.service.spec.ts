import { Test, TestingModule } from '@nestjs/testing';
import { DisclaimerService } from './disclaimer.service';

describe('DisclaimerService', () => {
  let service: DisclaimerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisclaimerService],
    }).compile();

    service = module.get<DisclaimerService>(DisclaimerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
