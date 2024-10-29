import { Module } from '@nestjs/common';
import { TextureService } from './texture.service';
import { TextureController } from './texture.controller';

@Module({
  controllers: [TextureController],
  providers: [TextureService],
})
export class TextureModule {}
