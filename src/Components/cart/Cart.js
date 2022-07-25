import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { auth, db } from '../../FirebaseConfig/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import CartCard from '../cartcard/CartCard';
import './Cart.css';

const Cart = () => {

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
    <div className='cartContainer'>
        <Navbar/>
        {cartData.length != 0 ?
        <div>
          <div className='cart-head'>Your Cart is empty</div>
          <div className='allcartitems'>
            {cartData.map((item)=>(
              <CartCard 
                key={item.id} 
                itemdata={item} 
                userid={loggedUser[0].uid}
              />
            ))}
          </div>
          <div className='proceedtocheckout'>
            <button className='proceedCheckoutButton'>Proceed to Checkout</button>
          </div>
        </div> :
        <p>Your cart is empty</p>}
    </div>
  )
}

export default Cart