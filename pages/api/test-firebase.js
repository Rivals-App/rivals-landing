// Test file to verify Firebase connection
import { NextResponse } from 'next/server';
import { adminDb } from '../../firebase-admin';

export default async function handler(req, res) {
  try {
    // Try to list all documents in the waitlist collection
    const snapshot = await adminDb.collection('waitlist').limit(1).get();
    
    // Success response
    res.status(200).json({ 
      success: true, 
      message: 'Successfully connected to Firebase!',
      hasDocuments: !snapshot.empty,
      documentCount: snapshot.size
    });
  } catch (error) {
    console.error('Firebase connection error:', error);
    
    // Error response with details
    res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to Firebase',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 