import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar.js';
import { storage, auth, db } from '../../FirebaseConfig/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, query, getDocs, where, addDoc } from 'firebase/firestore';
import './AddProducts.css'

const AddProducts = () => {
    const [productTitle, setProductTitle] = useState("")
    const [productType, setProductType] = useState("")
    const [description, setDescription] = useState("")
    const [brand, setBrand] = useState("")
    const [customerSupport, setCustomerSupport] = useState("")
    const [price, setPrice] = useState("")
    const [warranty, setWarranty] = useState("")
    const [productImage, setProductImage] = useState("")
    const [imageError, setImageError] = useState("")
    const [keyspecs, setKeyspecs] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [uploadError, setUploadError] = useState("")

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
                } else {
                    setUser(null);
                }
            })
        },[])
        return user
    }
    const loggedUser = GetCurrentUser();

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
    const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if(selectedFile) {
            if(selectedFile && types.includes(selectedFile.type)) {
                setProductImage(selectedFile);
                setImageError('');
            } else {
                setProductImage(null)
                setImageError('Please select a valid image file type(png or jpg)')
            }
        } else {
            setImageError('Please select your file')
        }
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `product-images${productType.toUpperCase()}/${Date.now()}}`)
        uploadBytes(storageRef, productImage)
            .then(()=> {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `products-${productType.toUpperCase()}`), {
                        productTitle,
                        productType,
                        description,
                        brand,
                        customerSupport,
                        price,
                        warranty,
                        productImage: url,
                        keyspecs:keyspecs
                    })
                })
            })
    }

    return (
        <div className='addProducts'>
            <Navbar />
            {loggedUser && loggedUser[0].email === "ukepogi86@gmail.com" ?
                <div className='addprod-container'>
                    <form className='addproductsform' onSubmit={handleAddProduct}>
                        <p className='addDataTitle'>Add Data</p>
                        {successMsg && <div className='success-msg'>{successMsg}</div>}
                        {uploadError && <div className='error-msg'>{uploadError}</div>}
                        <div className='group-input'>
                            <label className='titles'>Product Title</label>
                            <input 
                                type="text" 
                                className='inputs'
                                onChange={(e)=>{setProductTitle(e.target.value)}}
                                placeholder="Product Title"
                            />
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Product Type</label>
                            <input 
                                type="text" 
                                className='inputs'
                                onChange={(e)=>{setProductType(e.target.value)}}
                                placeholder="Product Type"
                            />
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Brand</label>
                            <input 
                                type="text" 
                                className='inputs'
                                onChange={(e)=>{setBrand(e.target.value)}}
                                placeholder="Brand"
                            />
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Price</label>
                            <input 
                                type="text" 
                                className='inputs'
                                onChange={(e)=>{setPrice(e.target.value)}}
                                placeholder="Price"
                            />
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Warranty</label>
                            <input 
                                type="text" 
                                className='inputs'
                                onChange={(e)=>{setWarranty(e.target.value)}}
                                placeholder="Warranty"
                            />
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Product Image</label>
                            <input 
                                type="file" 
                                className='inputs'
                                onChange={handleProductImg}
                            />
                            {imageError && <>
                                <div className='error-msg'>{imageError}</div>
                            </>}
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Key Specifications</label>
                            <textarea className='inputs' onChange={(e) => setKeyspecs(e.target.value)} placeholder="Enter some key specification"></textarea>
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Description</label>
                            <textarea 
                                className='inputs'
                                placeholder='Describe your product'
                                onChange={(e)=> setDescription(e.target.value)}>
                            </textarea>
                        </div>
                        <div className='group-input'>
                            <label className='titles'>Customer Support</label>
                            <input 
                                type="text" 
                                className='inputs'
                                onChange={(e)=>{setCustomerSupport(e.target.value)}}
                                placeholder="Customer Support"
                            />
                        </div>
                        <button className='submit-button' type='submit'>Add</button>
                    </form>
                </div> : <div>You don't have access to add products!</div>}
        </div>
    )
}

export default AddProducts