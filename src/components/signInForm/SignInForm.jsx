import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/userAction';
import Button, {BUTTON_TYPE_CLASSES} from '../button/Button';
import FormInput from '../formInput/FormInput';
import { SignInContainer, ButtonsContainer } from './signInform-styles';

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


    const resetFormFeild = () => {
        setFormFeilds(defaultFormFeild);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFeilds({ ...formFeilds, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();


        try {
            dispatch(emailSignInStart(email, password));
            resetFormFeild();
        } catch (error) {
            switch (error.code) {
                case `auth/wrong-password`:
                    alert('Incorrect password for this email');
                    break;
                    case `auth/user-not-found`:
                    alert('No user Associated with this E-mail');
                    break;
                default:
                    console.log(error);
            }
            console.log(error.message);
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
