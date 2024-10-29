import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextureModule } from './texture/texture.module';

@Module({
  imports: [TextureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
