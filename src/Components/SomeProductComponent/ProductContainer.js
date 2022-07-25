import React from 'react';
import { Link } from 'react-router-dom';
import './AllProductPage.css';

const ProductContainer = (product) => {
    
    let tax = 10/100;
    let commision = 10/100;
    let extrafun = 10/100;
    let prod = product.product

    let price = parseInt(prod.price);
    price = price + tax * price + commision * price + extrafun * price
    const saleprice = price - extrafun * price
    let discount = price * 10/100;

    return (
        <div className='product-container'>
            <img src={prod.productImage} alt="images" />
            <div className='product-details'>
                <a href={`/product/${prod.productType}/${prod.id}`}>
                    <button className='productTitle'>{prod.productTitle}</button>
                </a>

                <div className='price-container'>
                    <div className='price'>PRICE: 
                        <p className='rate'>{price} ({price - discount}) </p>
                    </div>   
                    <div className='saleprice'>Discount Price: 
                        <p className='rate'>{saleprice} </p>
                    </div>   
                    <div className='yousave'>You Save: 
                        <p className='save'>{price - saleprice} </p>
                    </div>                    
                </div>
                <a href={`/products/${prod.productType}/${prod.id}`}>
                    <button className='showmore-btn'>More Details...</button>
                </a>
            </div>
        </div>
    )
}

export default ProductContainer