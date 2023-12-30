import { Test, TestingModule } from '@nestjs/testing';
import { ServerTypeController } from './serverType.controller';
import { ServerTypeService } from './serverType.service';

describe('ServerTypeController', () => {
  let controller: ServerTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerTypeController],
      providers: [ServerTypeService],
    }).compile();

    controller = module.get<ServerTypeController>(ServerTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
