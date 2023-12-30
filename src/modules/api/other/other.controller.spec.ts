import { Test, TestingModule } from '@nestjs/testing';
import { OtherController } from './other.controller';
import { OtherService } from './other.service';

describe('OtherController', () => {
  let controller: OtherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherController],
      providers: [OtherService],
    }).compile();

    controller = module.get<OtherController>(OtherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
