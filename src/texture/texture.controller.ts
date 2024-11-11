import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TextureService } from './texture.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('texture')
export class TextureController {
  constructor(private firebaseService: FirebaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.firebaseService.uploadImage(file);
  }

  @Get()
  findAll() {
    return this.firebaseService.getAllImage();
  }

  @Delete()
  deleteTexture(@Body() deleteTexture: { pathImage: string }) {
    return this.firebaseService.deleteImage(deleteTexture.pathImage);
  }
}
