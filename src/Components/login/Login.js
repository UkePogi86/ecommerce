import React, { useState } from 'react';
import Navbar from '../navbar/Navbar.js';
import './login.css';

import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setSuccessMsg('Logged in succesfully, You will now be automatically redirected to home page.')
        
        setEmail('')
        setPassword('')
        setErrorMsg('')
        setTimeout(() => {
          setSuccessMsg('')
          navigate('/home')
        }, 3000);
    })
    .catch((error) => { 
      const errorCode = error.code;
      if(error.message === 'Firebase: Error (auth/invalid-email).') {
        setErrorMsg('Please fill all required fields');
      }
      if(error.message === 'Firebase: Error (auth/user-not-found).') {
        setErrorMsg('Email not found');
      } 
      if(error.message === 'Firebase: Error (auth/wrong-password).') {
        setErrorMsg('Wrong Password');
      }
    })
  }

  return (
    <div className='loginContainer'>
      <Navbar/>
      <div className='formContainer'>
        <form onSubmit={handleLogin}>
          <p className='formTitle'>Login Account</p>
          { successMsg && 
            <>
              <div className='success-msg'>
                {successMsg}
              </div>
            </> 
          }
          { errorMsg && 
            <>
              <div className='error-msg'>
                {errorMsg}
              </div>
            </> 
          }
          <div className='groupContainer'>
            <div className='groupItem'>
              <label className='formLabel' >Email</label>
              <input
                className='formInput' 
                type="email" 
                placeholder='Input your email' 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='groupItem'>
              <label className='formLabel'>Password</label>
                <input
                  className='formInput'
                  type="password" 
                  placeholder='Input your password' 
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className='btnSubmit' type='submit'>Login</button>
          </div>
          <div className=''>
              <span>Don't have an account?</span>
              <Link to='/signup'>Sign Up</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login