// src/lib/firebaseAdmin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import * as fs from 'fs';
import * as path from 'path';

// This function will now be called in your API route
export function initFirebaseAdmin() {
  // Check if an app is already initialized
  if (getApps().length) {
    return;
  }

  try {
    // 1. Get the file path from the environment variable
    const keyFilePath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH!);

    // 2. Read the JSON file from that path
    const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

    // 3. Initialize the app with the credentials from the file
    initializeApp({
      credential: cert(serviceAccount),
    });
    
  } catch (error) {
    console.error('Firebase Admin Initialization Error', error);
    // This makes the error clearer if it happens again
    throw new Error('Could not initialize Firebase Admin SDK. Please check your service account key path and format in firebase-service-account-key.json.');
  }
}