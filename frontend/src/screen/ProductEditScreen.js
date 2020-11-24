import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../node_modules/axios/index'
import { detailProduct, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

export default function ProductEditScreen(props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')

    const productId = props.match.params.id
    const productDetail = useSelector(state => state.productDetail)
    const {loading, error, product} = productDetail
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate
    const dispatch = useDispatch()
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productList')
        }
        if (!product || product._id !== productId || successUpdate)  {
            dispatch({type: PRODUCT_UPDATE_RESET})
            dispatch(detailProduct(productId))
        }else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [dispatch, productId, product, successUpdate, props.history])
    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            countInStock,
            brand,
            description
        }))
    }
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true)
        try {
            const {data} = await Axios.post('/api/uploads', bodyFormData, {
                headers: {'Content-Type' : 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}`}

            })
            console.log(data);
            setImage(data)
            setLoadingUpload(false)
        } catch (error) {
            setErrorUpload(true)
            setLoadingUpload(false)
        }

    }
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (<LoadingBox></LoadingBox>
                ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter name" value={name} onChange ={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input type="text" id="price" placeholder="Enter price" value={price} onChange ={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input type="text" id="image" placeholder="Enter image" value={image} onChange ={(e) => setImage(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input type="file" id="imageFile" label="Choose Image" onChange ={uploadFileHandler}/>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input type="text" id="category" placeholder="Enter category" value={category} onChange ={(e) => setCategory(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" id="brand" placeholder="Enter brand" value={brand} onChange ={(e) => setBrand(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input type="text" id="countInStock" placeholder="Enter countInStock" value={countInStock} onChange ={(e) => setCountInStock(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea type="text" id="description" placeholder="Enter description" value={description} onChange ={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label ></label>
                            <button type="submit" className="primary">Update</button>
                        </div>
                    </>
                ) }
               
            </form>
        </div>
    )
}
