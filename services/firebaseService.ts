import { GuessSubmission } from '../types';

/**
 * FIREBASE CONFIGURATION INSTRUCTIONS
 * 
 * 1. Go to console.firebase.google.com and create a new project.
 * 2. Enable Firestore Database.
 * 3. Copy your config object from Project Settings.
 * 4. Install firebase: npm install firebase
 * 5. Initialize app:
 * 
 * import { initializeApp } from 'firebase/app';
 * import { getFirestore, collection, addDoc } from 'firebase/firestore';
 * 
 * const firebaseConfig = {
 *   apiKey: "YOUR_API_KEY",
 *   authDomain: "your-project.firebaseapp.com",
 *   projectId: "your-project",
 *   storageBucket: "your-project.appspot.com",
 *   messagingSenderId: "...",
 *   appId: "..."
 * };
 * 
 * const app = initializeApp(firebaseConfig);
 * const db = getFirestore(app);
 */

export const submitGuessToFirestore = async (submission: GuessSubmission): Promise<boolean> => {
  // SIMULATION MODE
  // In a real app, you would uncomment the following lines:
  
  /*
  try {
    const docRef = await addDoc(collection(db, "tedx_guesses"), {
      ...submission,
      ip_hash: "mock_hash_" + Math.random().toString(36).substring(7) // In real app, use a cloud function to get IP
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
  */

  // Mock Latency
  return new Promise((resolve) => {
    console.log("Mocking Firestore Submission:", submission);
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};