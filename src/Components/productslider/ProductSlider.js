import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderProductCard from '../sliderproductcard/SliderProductCard';
import { collection, query, onSnapshot, getDocs, doc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig/firebaseConfig';
import './ProductSlider.css'

const ProductSlider = (props) => {

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

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='sliderproducts'>
            <Carousel responsive={responsive}>
                {products.map((product) => (
                    <SliderProductCard key={product.id} product={product} />
                ))}
            </Carousel>
        </div>
    )
}

export default ProductSlider