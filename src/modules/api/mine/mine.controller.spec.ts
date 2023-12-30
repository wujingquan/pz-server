import { Test, TestingModule } from '@nestjs/testing';
import { MineController } from './mine.controller';
import { MineService } from './mine.service';

describe('MineController', () => {
  let controller: MineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MineController],
      providers: [MineService],
    }).compile();

    controller = module.get<MineController>(MineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
