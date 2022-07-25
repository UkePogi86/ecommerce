import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import './UserProfile.css'
import { auth, db } from '../../FirebaseConfig/firebaseConfig';
import { collection, query, getDocs, where } from 'firebase/firestore';

const UserProfile = () => {

  function GetCurrentUser() {
    const [user, setUser] = useState('')
    const usersCollectionRef = collection(db, "users")


    useEffect(()=> {
        auth.onAuthStateChanged(userlogged => {
            if(userlogged){
                const getUsers = async () => {
                    const q = query(collection(db, "users"),where("uid", "==", userlogged.uid))
                    const data = await getDocs(q);
                    setUser(data.docs.map((doc) => ({...doc.data(),id:doc.id})))
                }
                getUsers();
            }
            else {
                setUser(null);
            }
        })
    },[])
    return user
  }
  const loggedUser = GetCurrentUser();
  if(loggedUser) { console.log(loggedUser[0].email) }

  return (
    <div className='userprofile-container'>
      <Navbar/>
      <div className='userprofile-outercontainer'>
        { loggedUser ?
          <div className='user-profile'>
            <p>Your Account Details</p>
            <div className='data-row'>
              <span>Your Name</span>
              <span>{loggedUser[0].username}</span>
            </div>
            <div className='data-row'>
              <span>Your Email</span>
              <span>{loggedUser[0].email}</span>
            </div>
            <div className='data-row'>
              <span>Your Phone Number</span>
              <span>{loggedUser[0].phonenumber}</span>
            </div>
            <div className='data-row'>
              <span>Your Address</span>
              <span>{loggedUser[0].address}</span>
            </div>
          </div> : 
          <div>
            Your are not logged in
          </div>
        }
      </div>
    </div>
  )
}

export default UserProfile