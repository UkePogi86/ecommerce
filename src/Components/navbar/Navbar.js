import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import applogo from '../assets/tritonlogo.jpg'
import './Navbar.css';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import { auth, db } from '../../FirebaseConfig/firebaseConfig';
import { collection, query, getDocs, where } from 'firebase/firestore';

const Navbar = () => {

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
  const navigate = useNavigate()
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login")
    })
  }

  const [cartData, setCartData] = useState([]);
  if(loggedUser) {
    const getCartData = async () => {
      const cartArray = [];
      const path = `cart-${loggedUser[0].uid}`

      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartArray.push({ ...doc.data(), id: doc.id })
        });
        setCartData(cartArray)
      }).catch('Error')
    }
    getCartData()
  }

  return (
    <>
      <div className='navbar'>
        <div className='LeftContainer'>
          <Link to="/">
            <img src={applogo} alt="logo"/>
          </Link>

        </div>
        <div className='RightContainer'>
          {!loggedUser && <nav className='nav'>
            <div className='navigation'>
              <Link to="/" className=''>
                <button className='button'><HomeOutlinedIcon />HOME</button>
              </Link>
              <Link to="/addproducts">
                <button className='button'><StorefrontOutlinedIcon />SELL</button>
              </Link>
              <Link to="/login" >
                <button className='button'><LoginOutlinedIcon /> LOGIN</button>
              </Link>
              <Link to="/signup" >
                  <button className='button'><AppRegistrationOutlinedIcon />SIGNUP</button>
              </Link>
{/*               <Link to="/cart">
                <div className='cart-container'>
                  <ShoppingCartOutlinedIcon className='cart-icon' />
                </div>
              </Link> */}
              <Link to="/userprofile">
                  <button className='profile'><AccountCircleOutlinedIcon /></button>
              </Link>
            </div>
          </nav>}
          {loggedUser && 
            <nav className='nav'>
              <div className='navigation'>
              <Link to="/" className=''>
                  <div className='cart-container'>
                    <HomeOutlinedIcon className='home-icon' />
                  </div>
                </Link>
                <Link to="/addproducts" className=''>
                  <div className='cart-container'>
                    <StorefrontOutlinedIcon className='store-icon' />
                  </div>
                </Link>
                <Link to="/cartdata" className=''>
                  <div className='cart-container'>
                    <ShoppingCartOutlinedIcon className='cart-icon' />
                    <button className='cart-item'>{cartData.length}</button>
                  </div>
                </Link>
                <Link to="/userprofile">
                  <AccountCircleOutlinedIcon />
                  <button className='logout-btn' onClick={handleLogout}>Logout</button>
                </Link>
              </div>
            </nav>
          }
        </div>
      </div>
      <div className='product-types'>
        <a href='/product-types/triton'><button className='product-type-btn'>Triton</button></a>
        <a href='/product-types/rosco'><button className='product-type-btn'>Rosco</button></a>
        <a href='/product-types/duracoat'><button className='product-type-btn'>DuraCoat</button></a>
        <a href='/product-types/odourfresh'><button className='product-type-btn'>Odourfresh</button></a>
        <a href='/product-types/duraseal'><button className='product-type-btn'>Duraseal</button></a>
        <a href='/product-types/lotus'><button className='product-type-btn'>Lotus</button></a>
        <a href='/product-types/primecoat'><button className='product-type-btn'>Primecoat</button></a>
        <a href='/product-types/acrilux'><button className='product-type-btn'>Acrilux</button></a>
      </div>
    </>

  )
}

export default Navbar