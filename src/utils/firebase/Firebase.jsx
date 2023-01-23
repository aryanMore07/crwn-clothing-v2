import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // If user does not exists

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log(`Error crating the user ERROR MESSAGE: ${error.message}`);
        }
    } 

    return userDocRef;
};