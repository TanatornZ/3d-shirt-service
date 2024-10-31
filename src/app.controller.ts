import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseService } from './firebase/firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @Get('/firebase')
  async getFirebaseDocument(): Promise<any> {
    try {
      return this.firebaseService.getAllDocuments('test');
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.firebaseService.uploadImage(file);
  }
}
