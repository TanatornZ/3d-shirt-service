// src/firebase/firebase.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  private firebaseApp: admin.app.App;

  onModuleInit() {
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
}
