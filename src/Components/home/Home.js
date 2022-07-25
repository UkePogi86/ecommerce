import React, { useState, useEffect } from 'react';
import Banner from '../banner/Banner';
import Navbar from '../navbar/Navbar';
import { auth, db } from '../../FirebaseConfig/firebaseConfig';
import { collection, query, getDocs, where } from 'firebase/firestore';
import ProductSlider from '../productslider/ProductSlider';
import './home.css'

const Home = () => {
    
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
    /* console.log(loggedUser) */

    return (
        <div className='homecontainer'>
            <div className='homecontent'>
                <Navbar/>
                <Banner />
                <ProductSlider type={'Triton'}/>
                <ProductSlider type={'Rosco'}/>
                <ProductSlider type={'Duracoat'}/>
                <ProductSlider type={'Odourfresh'}/>
            </div>
        </div>

    )
}

export default Home