import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfig/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import './SpecificProductPage.css';
import ProductSlider from '../productslider/ProductSlider'

const SpecificProductPage = () => {
  
  const { id, type } = useParams()
  const [product, setProduct] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("") 

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

  function GetCurrentProduct() {
    useEffect(()=>{
      const getProduct = async () => {
        const docRef = doc(db, `products-${type.toUpperCase()}`, id)
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data())
      };
      getProduct();
    }, [])
    return product
  }
  GetCurrentProduct();

  const addToCart = () => {
    if(loggedUser) {
      addDoc(collection(db, `cart-${loggedUser[0].uid}`), {
        product, quantity: 1
      }).then(() => {
        setSuccessMsg('Product added to cart');
      }).catch((error) => { setErrorMsg(error.message) });
    } else {
      setErrorMsg('You need to login first!')
    }
  }

  let overalltax = 10 / 100
  let overallcommission = 10 /100
  let extraforfun = 10 / 100

  let prc = parseInt(product.price)
  prc = prc + overalltax * prc + overallcommission * prc + extraforfun * prc
  const saleprice = prc - extraforfun * prc
  
  return (
    <div className='specificproductpage-container'>
        <Navbar/>
        {
          product ? <div className='myprod-container'>
            <div className='product-images-container'>
              <img alt='product images' src={ product.productImage } />
            </div>
            <div className='product-data'>
              <p className='product-head'>{ product.productTitle }</p>
              <p className='product-keyspces'>{product.price}</p>

              <div className='specific-price-container'>
                <div className='price'>PRICE: 
                  <p className='rate'>{prc}</p>
                </div>   
                <div className='saleprice'>Discount Price: 
                    <p className='rate'>{saleprice}</p>
                </div>   
                <div className='yousave'>You Save: 
                    <p className='rate'> {prc - saleprice}</p>
                </div> 
                <p className='product-details-head'>Details</p>
                <p className='product-description'>{product.description}</p>
                <div className='row-container'>
                  <div className='warranty-replacement'>
                    <div className='cod'>
                      <div className='img-circle'>
                        <PaymentOutlinedIcon/>
                      </div>
                      <p>Cash on Delivery</p>
                    </div>
                    <div className='calendar'>
                      <div className='img-circle'>
                        <CalendarMonthOutlinedIcon/>
                      </div>
                      <p>{product.warranty}</p>
                    </div>
                    <div className='replacement'>
                      <div className='img-circle'>
                        <PublishedWithChangesOutlinedIcon/>
                      </div>
                      <p>10 Days replacement</p>
                    </div>
                  </div>
                  <div className='buy-cart'>
                    <button className='btn'>Buy Now</button>
                    <button className='btn' onClick={addToCart}>Add to Cart</button>
                    { successMsg && <>
                      <div className='success-msg'>{successMsg}</div>
                    </> }
                    { errorMsg && <>
                      <div className='error-msg'>{errorMsg}</div>
                    </>  
                    }
                  </div>
                </div>
              </div>
            </div>
          </div> : <div>Loading...</div>
        }
        <p className='product-details'>Similar Items</p>
        <ProductSlider type={type}></ProductSlider>
    </div>
  )
}

export default SpecificProductPage