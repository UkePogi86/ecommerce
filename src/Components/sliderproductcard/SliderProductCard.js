import React from 'react';
import { Link } from 'react-router-dom';
import './SliderProductCard.css'

const SliderProductCard = (product) => {

    let tax = 10/100;
    let commision = 10/100;
    let extrafun = 10/100;
    let prod = product.product

    let price = parseInt(prod.price);
    price = price + tax * price + commision * price + extrafun * price
    const saleprice = price - extrafun * price
    let discount = price * 10/100;

    return (
        <div className='product-card-container'>
            <div className='img-container'>
                <img className='prodImg' src={prod.productImage} alt="images" />
            </div>
            <div className='product-details'>
                <div className='productTitle'>PRICE: 
                    <p className='rate'>&#8369; {price}</p>
                </div>
                <div className='productTitle'>DISCOUNT: 
                    <p className='discount'>&#8369; {discount}</p>
                </div>
                <div className='productTitle'>SALE: 
                    <p className='sale'>&#8369; {saleprice}</p>
                </div>
                <Link to={`/product/${prod.id}/${prod.productTitle}`}>
                    <button className='showmore-btn'>Show more &gt;</button>
                </Link>
            </div>
        </div>
    )
}

export default SliderProductCard