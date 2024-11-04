import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TextureService } from './texture.service';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('texture')
export class TextureController {
  constructor(
    private readonly textureService: TextureService,
    private firebaseService: FirebaseService,
  ) {}

  @Post()
  create(@Body() createTextureDto: CreateTextureDto) {
    return this.textureService.create(createTextureDto);
  }

  @Get()
  findAll() {
    return this.firebaseService.getAllImage();
  }
}
