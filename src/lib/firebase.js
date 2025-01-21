import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_WEB_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const initializeAuthListener = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (user) callback(user);
        else callback(null);
    });
}

export const setAuthPersistence = async (rememberMe) => {
    const persistence = rememberMe ? browserLocalPersistence : "none";
    await setPersistence(auth, persistence);
}

export const signUpUser = async (email, password, name_first, name_last) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
            name_first,
            name_last,
            email,
            balance: 10000
        });
        return userCredential;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user.uid;
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error;
    }
}

export const getUserProfile = async (userId) => {
    try {
        const docSnapshot = await getDoc(doc(db, "users", userId));
        return docSnapshot.data();
    } catch (error) {
        console.error("Error getting user profile:", error);
        throw error;
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out user:", error);
    }
}

export default app;