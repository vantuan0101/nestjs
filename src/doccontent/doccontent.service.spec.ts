import { Test, TestingModule } from '@nestjs/testing';
import { DoccontentService } from './doccontent.service';

describe('DoccontentService', () => {
  let service: DoccontentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoccontentService],
    }).compile();

    service = module.get<DoccontentService>(DoccontentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
