import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/userAction';
import Button from '../button/Button';
import FormInput from '../formInput/FormInput';
import { SignUpContainer } from './signupform-styles'; 

const SignUpForm = () => {
    const dispatch = useDispatch();
    const defaultFormFeild = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formFeilds, setFormFeilds] = useState(defaultFormFeild);
    const {displayName, email, password, confirmPassword} = formFeilds;
    
    const resetFormFeild = () => {
        setFormFeilds(defaultFormFeild);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFeilds({...formFeilds, [name]: value}); 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert(`Passwords do not match `);
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFeild();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert(`Cannot create user, email already in use`)
            } else {
                console.log(`User creation encountered an error : ${error.message}`);
            }
        }
    }

  return (
    <SignUpContainer>
      
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label='Display Name' onChange={handleChange} name='displayName' value={displayName} type="text" required id='displayName'/>

        <FormInput label='Email' onChange={handleChange} name='email' value={email} type="email" required id='userEmail'/>
        
        <FormInput label='Password' onChange={handleChange} name='password' value={password} type="password" required id='userPassword'/>
        
    
        <FormInput label='Confirm Password' onChange={handleChange} name='confirmPassword' value={confirmPassword} type="password" required id='userConfirmPassword'/>
        
        <Button type='submit'>Sign Up</Button>
      
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm;
