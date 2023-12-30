import { Test, TestingModule } from '@nestjs/testing';
import { ServerTypeService } from './serverType.service';

describe('ServerTypeService', () => {
  let service: ServerTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerTypeService],
    }).compile();

    service = module.get<ServerTypeService>(ServerTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
