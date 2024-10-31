// src/firebase/firebase.service.ts

import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as fs from 'fs';
import * as util from 'util';

const unlinkFile = util.promisify(fs.unlink); // For deleting local files after upload

@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
  constructor(private readonly configService: ConfigService) {}
  private firebaseApp: admin.app.App;
  private bucket;

  onApplicationBootstrap() {
    if (!admin.apps.length) {
      const adminConfig: admin.ServiceAccount = {
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        privateKey: this.configService
          .get<string>('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
        clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      };
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
      });
      this.bucket = admin.storage().bucket('test');
      console.log('Firebase initialized successfully');
    } else {
      this.firebaseApp = admin.app(); // reuse existing app if already initialized
      console.log('Firebase already initialized');
    }
  }

  getFirebaseApp(): admin.app.App {
    return this.firebaseApp;
  }

  async getDocument(collectionName: string, documentId: string) {
    try {
      const docRef = this.firebaseApp
        .firestore()
        .collection(collectionName)
        .doc(documentId);
      const doc = await docRef.get();

      if (doc.exists) {
        return doc.data();
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  async getAllDocuments(collectionName: string) {
    try {
      const collectionRef = this.firebaseApp
        .firestore()
        .collection(collectionName);
      const snapshot = await collectionRef.get();

      if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
      }

      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  uploadImage = async (file: Express.Multer.File) => {
    const fileName = `${uuidv4()}_${file.originalname}`;
    const filePath = join(__dirname, '../../uploads', fileName);

    // Temporarily save the image to the server's file system
    fs.writeFileSync(filePath, file.buffer);

    // Upload file to Firebase Storage
    // upgrade firebase plan
    const destination = `images/${fileName}`;
    await this.bucket.upload(filePath, {
      destination,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(), // Unique token for public URL
        },
      },
    });

    // Remove file from local storage
    await unlinkFile(filePath);

    // Get public URL
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${this.bucket.name}/o/${encodeURIComponent(destination)}?alt=media`;
    return fileUrl;
  };

  async deleteImage(filePath: string): Promise<void> {
    try {
      const file = this.bucket.file(filePath);
      await file.delete();
      console.log(`Image deleted successfully: ${filePath}`);
    } catch (error) {
      console.error(`Failed to delete image: ${error.message}`);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }
}
