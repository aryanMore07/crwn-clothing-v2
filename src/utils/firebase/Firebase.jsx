import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDDF1gBT1-hSwMWT1W0M-gAP4VlMJj1bn8",
    authDomain: "e-commerce-db-b9aaf.firebaseapp.com",
    projectId: "e-commerce-db-b9aaf",
    storageBucket: "e-commerce-db-b9aaf.appspot.com",
    messagingSenderId: "790851061746",
    appId: "1:790851061746:web:22a06b0a9f4bdd1bff8d6b"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if( !userAuth ) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    // If user does not exists

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log(`Error crating the user ERROR MESSAGE: ${error.message}`);
        }
    } 

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if( !email || !password ) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}