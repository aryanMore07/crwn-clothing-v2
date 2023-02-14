import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/userAction';
import Button, {BUTTON_TYPE_CLASSES} from '../button/Button';
import FormInput from '../formInput/FormInput';
import { SignInContainer, ButtonsContainer } from './signInform-styles';
import { ToastContainer, toast } from 'react-toastify';

const defaultFormFeild = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFeilds, setFormFeilds] = useState(defaultFormFeild);
    const { email, password } = formFeilds;

    const signInWithGoogle = () => {
        dispatch(googleSignInStart());        
    }


    const resetFormField = () => {
        setFormFeilds(defaultFormFeild);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFeilds({ ...formFeilds, [name]: value });
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormField();
        } catch (error) {
            toast.error('user sign in failed', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            console.log(`hello error here ${error}`)
        }
    }

    return (
        <SignInContainer>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Email' onChange={handleChange} name='email' value={email} type="email" required  />

                <FormInput label='Password' onChange={handleChange} name='password' value={password} type="password" required  />

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    )
}

export default SignInForm;
