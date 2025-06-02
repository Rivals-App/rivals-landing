# Firebase Setup Guide

## Getting a Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `rivalswaitlist`
3. Click on the gear icon (⚙️) next to "Project Overview" in the left sidebar
4. Select "Project settings"
5. Go to the "Service accounts" tab
6. Click "Generate new private key"
7. Save the downloaded JSON file as `serviceAccountKey.json` in the root of your project

**Important:** Never commit this file to version control. Add it to your `.gitignore` file.

## Using the Service Account Key

The application is already configured to use this file for Firebase Admin SDK authentication.

If you prefer to use environment variables (for deployments), set the following variables:

```env
FIREBASE_PROJECT_ID=rivalswaitlist
FIREBASE_CLIENT_EMAIL=your-service-account-email@example.com
FIREBASE_PRIVATE_KEY="your-private-key"
```

## Testing the Connection

1. Make sure you have the `serviceAccountKey.json` file in the project root
2. Run the development server: `npm run dev`
3. Test the API endpoints:
   - `/api/waitlist` - For adding new users to the waitlist
   - `/api/check-email` - For checking if an email already exists

## Migrating Data from Supabase

Run the migration script:

```
npm run migrate
```

This will transfer all waitlist data from Supabase to Firebase.

## Troubleshooting

If you see `Error: Could not load the default credentials`, make sure:
1. The `serviceAccountKey.json` file is in the correct location
2. The file has the correct format and permissions
3. You've restarted your development server after adding the file 