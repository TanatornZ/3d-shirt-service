import { Module } from '@nestjs/common';
import { TextureService } from './texture.service';
import { TextureController } from './texture.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [TextureController],
  providers: [TextureService],
})
export class TextureModule {}
