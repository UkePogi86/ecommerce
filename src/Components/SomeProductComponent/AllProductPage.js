import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import './AllProductPage.css';
import ProductContainer from './ProductContainer'
import { collection, query, onSnapshot, getDocs, doc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig/firebaseConfig';

const AllProductPage = (props) => {
    const [products, setProducs] = useState([])
    useEffect(() => {
        const getProducts = () => {
            const productArray = []
            const path = `products-${props.type.toUpperCase()}`;
            console.log(path)

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id })
                    console.log(doc.id, " => ", doc.data())
                })
                setProducs(productArray)
            }).catch((error) => {
                console.log(error.message)
            })
        }
        getProducts()
    }, [])

    /* console.log(props.type) */

    return (
        <div className='allproductpage'>
            <Navbar/>
            <div className='heading'>
                <p>Top Results for {props.type}</p>
            </div>
            <div className='allproductContainer'>
                {products.map((product) => (
                    <ProductContainer
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}

export default AllProductPage