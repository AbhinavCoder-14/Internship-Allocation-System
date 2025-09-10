import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

// Initialize the Prisma client to interact with your database
const prisma = new PrismaClient();

// This function will handle POST requests sent to `/api/profile`
export async function POST(request: Request) {
  try {
    console.log("Entered in the backend api")
    // Ensure the Firebase Admin SDK is initialized for backend operations
    initFirebaseAdmin();

    // 1. VERIFY THE USER'S IDENTITY (Security First!)
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const idToken = authorization.split('Bearer ')[1];
    
    // Use the Firebase Admin SDK to securely verify the token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // If we reach here, the user is authenticated.

    // 2. GET THE PROFILE DATA FROM THE REQUEST BODY
    const profileData = await request.json();

    // 3. SAVE THE DATA TO THE DATABASE USING PRISMA

    // First, find our internal user record that matches the Firebase UID.
    // If it doesn't exist, create it. This is a robust "upsert" operation.
    const user = await prisma.user.upsert({
      where: { firebaseUid: uid },
      update: {}, // No updates needed for the User model itself
      create: {
        firebaseUid: uid,
        email: email || '', // Use the verified email from the token
        role: 'STUDENT',    // Assign the 'STUDENT' role
      },
    });

    // Now, create or update the student's profile, linking it to our user record.
    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId: user.id }, // Find the profile linked to our user
      update: {
        ...profileData, // Update it with the new form data
      },
      create: {
        userId: user.id, // On creation, link it to our user's ID
        ...profileData, // Add all the new form data
      },
    });

    // 4. RETURN A SUCCESS RESPONSE
    return NextResponse.json({ success: true, profile: studentProfile });

  } catch (error: any) {
    console.error('API Error saving profile:', error.message);
    
    if (error.code === 'auth/id-token-expired') {
        return NextResponse.json({ error: 'Your session has expired. Please log in again.' }, { status: 401 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
