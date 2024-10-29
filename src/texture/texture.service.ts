import { Injectable } from '@nestjs/common';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';

@Injectable()
export class TextureService {
  create(createTextureDto: CreateTextureDto) {
    return 'This action adds a new texture';
  }

  findAll() {
    return `This action returns all texture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} texture`;
  }

  update(id: number, updateTextureDto: UpdateTextureDto) {
    return `This action updates a #${id} texture`;
  }

  remove(id: number) {
    return `This action removes a #${id} texture`;
  }
}
