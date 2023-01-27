import React from 'react';
import { useState } from 'react';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/Firebase';
import Button from '../button/Button';
import FormInput from '../formInput/FormInput';
import './signInform.scss';

const defaultFormFeild = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFeilds, setFormFeilds] = useState(defaultFormFeild);
    const { email, password } = formFeilds;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }


    const resetFormFeild = () => {
        setFormFeilds(defaultFormFeild);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFeilds({ ...formFeilds, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            await signInAuthUserWithEmailAndPassword(email, password);
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
        <div className='sign-in-container'>

            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Email' onChange={handleChange} name='email' value={email} type="email" required  />

                <FormInput label='Password' onChange={handleChange} name='password' value={password} type="password" required  />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;
