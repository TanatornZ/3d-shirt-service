import { Test, TestingModule } from '@nestjs/testing';
import { TextureController } from './texture.controller';
import { TextureService } from './texture.service';

describe('TextureController', () => {
  let controller: TextureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextureController],
      providers: [TextureService],
    }).compile();

    controller = module.get<TextureController>(TextureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
