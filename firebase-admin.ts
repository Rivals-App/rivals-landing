import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as path from 'path';

// Check if Firebase Admin is already initialized to avoid multiple initializations
if (!getApps().length) {
  try {
    // For local development, try to use a local service account key file
    const serviceAccount = require(path.join(process.cwd(), 'serviceAccountKey.json'));
    
    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: "https://rivalswaitlist-default-rtdb.firebaseio.com"
    });
    
    console.log("Firebase Admin initialized with service account key");
  } catch (error: any) {
    console.warn("Could not load service account key, falling back to environment variables:", error.message);
    
    // Fallback to environment variables for deployment
    initializeApp({
      projectId: "rivalswaitlist",
      databaseURL: "https://rivalswaitlist-default-rtdb.firebaseio.com"
    });
  }
}

export const adminDb = getFirestore(); 