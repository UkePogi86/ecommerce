import React, { useState, useEffect } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig/firebaseConfig';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './CartCard.css'

const CartCard = (props) => {
    const [productQuantity, setProductQuantity] = useState(props.itemdata.quantity);

    let p = props.itemdata.product.price
    let overalltax = 1 / 100;
    let overallcommission = 10 / 100;
    let extraforfun = 10 / 100;

    let prc = parseInt(p)
    prc = prc + overalltax * prc + overallcommission * prc + extraforfun * prc
    const saleprice = (prc - extraforfun * prc) * productQuantity

    const increaseQuantity = async () => {
        setProductQuantity(productQuantity + 1)

        const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref, {
            quantity: productQuantity + 1
        }).then(()=>{ console.log('changed quantity') })
    }
    const decreaseQuantity = async () => {
        if(productQuantity >= 1) {
            setProductQuantity(productQuantity -1)

            const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: productQuantity - 1
            }).then(()=>{ console.log('changed quantity') })
        }
    }

    const deleteCartItem = async () => {
        await deleteDoc(doc(db, `cart-${props.userid}`, `${props.itemdata.id}`))
            .then(()=>{
                console.log('doc deleted')
            })
    }

    return (
        <div className='cart-product-container'>
            <div className='cart-product-image'>
                <div className='product-image'>
                    <img src={props.itemdata.product.productImage} alt="productImage" />
                </div>
                <div className='product-title'>{props.itemdata.product.productTitle}</div>
            </div>
            <div className='product-quantity'>
                <button onClick={ decreaseQuantity }>-</button>
                <p>{ productQuantity }</p>
                <button onClick={ increaseQuantity }>+</button>
            </div>
            <div className='product-price'>{saleprice}</div>
            <button className='deleteCartItem' onClick={deleteCartItem}>
                <DeleteOutlineOutlinedIcon />
            </button>
        </div>
    )
}

export default CartCard