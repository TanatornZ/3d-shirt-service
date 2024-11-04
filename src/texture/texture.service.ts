import { Injectable } from '@nestjs/common';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class TextureService {
  create(createTextureDto: CreateTextureDto) {
    return 'This action adds a new texture';
  }
}
