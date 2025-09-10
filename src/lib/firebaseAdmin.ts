// src/lib/firebaseAdmin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import * as fs from 'fs';
import * as path from 'path';

export function initFirebaseAdmin() {
  if (!getApps().length) {
    try {
      const keyFilePath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH!);
      const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

      initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (error) {
      console.error('Firebase Admin Initialization Error', error);
      throw new Error('Could not initialize Firebase Admin SDK. Please check your service account key path and format.');
    }
  }
}