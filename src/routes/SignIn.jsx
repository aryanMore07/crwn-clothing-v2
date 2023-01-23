import { signInWithGooglePopup, createUserDocumentFromAuth } from '../utils/firebase/Firebase';


const SignIn = () => {
    
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    return (
        <div>
            <h1>SignIn page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}

export default SignIn
