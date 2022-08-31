import { Test, TestingModule } from '@nestjs/testing';
import { DoccontentController } from './doccontent.controller';

describe('DoccontentController', () => {
  let controller: DoccontentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoccontentController],
    }).compile();

    controller = module.get<DoccontentController>(DoccontentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
