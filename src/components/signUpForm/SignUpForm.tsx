import { useState, FormEvent, ChangeEvent } from 'react';
// import { AuthErrorCodes, AuthError } from 'firebase/auth';   
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/userAction';
import Button from '../button/Button';
import FormInput from '../formInput/FormInput';
import { SignUpContainer } from './signupform-styles'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultFormFeild = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formFeilds, setFormFeilds] = useState(defaultFormFeild);
    const {displayName, email, password, confirmPassword} = formFeilds;
    
    const resetFormField = () => {
        setFormFeilds(defaultFormFeild);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFeilds({...formFeilds, [name]: value}); 
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            toast.error(`Passwords do not match`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormField();   
            navigate('/');
        } catch (error) {
            console.log(`Error oocured`);
            console.log(`${error}`);

            // if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
            //     toast.error(`Cannot create user, email already in use`, {
            //         position: "top-center",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //         });
            // } else {
            //     toast.error(`User creation encountered an error`, {
            //         position: "top-center",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //         });
            // }            
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
