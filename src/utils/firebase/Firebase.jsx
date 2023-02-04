import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

// Referance to connect with The Firebase Db:
const firebaseConfig = {
    apiKey: "AIzaSyDDF1gBT1-hSwMWT1W0M-gAP4VlMJj1bn8",
    authDomain: "e-commerce-db-b9aaf.firebaseapp.com",
    projectId: "e-commerce-db-b9aaf",
    storageBucket: "e-commerce-db-b9aaf.appspot.com",
    messagingSenderId: "790851061746",
    appId: "1:790851061746:web:22a06b0a9f4bdd1bff8d6b"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();

// Function to use Google as a SignIn option 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();



// Function to add Categories collection to the FireStore:
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

} 

//
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapShot => docSnapShot.data());

}




// Function to add user details inside the Firestore:
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

    return userSnapshot;
};


// Function to SignIn User using email and password:
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if( !email || !password ) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if( !email || !password ) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unSubcribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unSubcribe();
                resolve(userAuth);
            },
            reject
        );
    });
}
