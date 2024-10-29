import { Test, TestingModule } from '@nestjs/testing';
import { TextureService } from './texture.service';

describe('TextureService', () => {
  let service: TextureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextureService],
    }).compile();

    service = module.get<TextureService>(TextureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
