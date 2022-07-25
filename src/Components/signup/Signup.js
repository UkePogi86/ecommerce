import './signup.css'
import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../FirebaseConfig/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
 
const Signup = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [address, setAddress] = useState("")

  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialcartvalue = 0;
        console.log(user)

        addDoc(collection(db, "users"), {
          username: username, 
          email: email, 
          phonenumber: phonenumber, 
          password: password, 
          cart: initialcartvalue, 
          address: address,
          uid: user.uid
        }).then(()=> {
          setSuccessMsg('New user added succesfully, You will now be automatically redirected to login page.')
          setUsername('')
          setPhonenumber('')
          setEmail('')
          setPassword('')
          setErrorMsg('')
          setTimeout(() => {
            setSuccessMsg('')
            navigate('/login')
          }, 4000);
        })
        .catch((error) => { setErrorMsg(error.message) })
      })
      .catch((error) => { 
        if(error.message === 'Firebase: Error (auth/invalid-email).') {
          setErrorMsg('Please fill all required fields')
        }
        if(error.message === 'Firebase: Error (auth/email-already-in-use).') {
          setErrorMsg('User already exists')
        } 
      })
  }

  return (
    <div className='SignupContainer'>
      <Navbar/>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <p className='formTitle'>Create Account</p>
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
              <label className='formLabel'>Username</label>
              <input
                className='formInput' 
                type="text" 
                placeholder='Josue Tutor' 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='groupItem'>
              <label className='formLabel'>Email</label>
              <input 
                className='formInput'
                type="email" 
                placeholder='Enter your email' 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='groupItem'>
              <label className='formLabel'>Mobile Number</label>
              <input 
                className='formInput'
                type="tel" 
                placeholder='09951260950' 
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
            <div className='groupItem'>
              <label className='formLabel'>Password</label>
              <input 
                className='formInput'
                type="password" 
                placeholder='Enter your password' 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='groupItem'>
              <label className='formLabel'>Address</label>
              <input  
                className='formInput' 
                type="text" 
                placeholder='Enter your address' 
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button className='btnSubmit' type='submit'>Sign up</button>
          </div>
          <div className=''>
              <span>Already have an account?</span>
              <Link to='/login'>Sign in</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup