import SignUpForm from '../components/signUpForm/SignUpForm';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../utils/firebase/Firebase';

const SignIn = () => {
    
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>SignIn page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn
