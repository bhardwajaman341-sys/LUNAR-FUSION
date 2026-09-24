import admin from 'firebase-admin';

// Initialize with Firebase project ID
admin.initializeApp({
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. No access token provided.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired authentication token.' });
  }
};