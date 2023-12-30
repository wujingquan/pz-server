import { Test, TestingModule } from '@nestjs/testing';
import { MineService } from './mine.service';

describe('MineService', () => {
  let service: MineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MineService],
    }).compile();

    service = module.get<MineService>(MineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
