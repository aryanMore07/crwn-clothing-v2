import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/userAction';
import Button, {BUTTON_TYPE_CLASSES} from '../button/Button';
import FormInput from '../formInput/FormInput';
import { SignInContainer, ButtonsContainer } from './signInform-styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const defaultFormFeild = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formFeilds, setFormFeilds] = useState(defaultFormFeild);
    const { email, password } = formFeilds;

    const signInWithGoogle = () => {
        try {
            dispatch(googleSignInStart());   
            navigate('/')
        } catch (error) {
            toast.error('Unable to sign in through Google. Please try again later', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
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
            navigate('/')
        } catch (error) {
            
            console.log(`hello error here ${error}`)
        }
    }

    return (
        <SignInContainer>
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
