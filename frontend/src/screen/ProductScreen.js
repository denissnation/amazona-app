import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, detailProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'

export default function ProductScreen(props) {
    const dispatch = useDispatch()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productId = props.match.params.id

    const productDetail = useSelector(state => state.productDetail)
    const {loading, product, error} = productDetail

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const{loading: loadingReview, error: errorReview, succes: successReview} = productReviewCreate
    

    useEffect(() => {
        if (successReview) {
            window.alert('Review Submitted Successfully')
            setRating('')
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET})
        }
        dispatch(detailProduct(productId))
    }, [dispatch, productId, successReview])
    
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        
        if (comment && rating) {
            dispatch(createComment(productId, {rating, comment, name: userInfo.name} ))
        }else{
            alert('Please Enter comment and rating')
        }
        
            
    }
    return (
        <div>
            {loading? (<LoadingBox></LoadingBox>)
            : error? (<MessageBox variant="danger">{error}</MessageBox>):
                (
                    <div>
                        <Link to="/">Back to Result</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={product.image} alt={product.name}/>
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li>
                                        <h1>Product Name</h1>
                                    </li>
                                    <li>
                                        <Rating rating= {product.rating} numReviews = {product.numReviews}></Rating>
                                    </li>
                                    <li>
                                        Price: ${product.price}
                                    </li>
                                    <li>Description: <p>{product.description}</p></li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            Seller {' '}
                                            <h2>
                                                <Link to={`/seller/${product.seller._id}`}>
                                                    {product.seller.seller.name}
                                                </Link>
                                            </h2>
                                            <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews}>

                                            </Rating>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">${product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>status</div>
                                                <div>
                                                    {product.countInStock > 0 ? (
                                                        <span className="success">In Stock</span>
                                                        ) : (
                                                        <span className="error"> Unavailable</span>)}
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            product.countInStock > 0 && (
                                                <>
                                                    <li>
                                                        <div className="row">
                                                            <div>Qty</div>
                                                            <div>
                                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map(x => (
                                                                            <option value={x+1} key={x+1}>{x+1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                    </li>
                                                </>
                                            )

                                        }
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 id="reviews">Reviews</h2>
                            {product.reviews.length === 0 && (
                                <MessageBox>There is no Review </MessageBox>
                            )}
                            <ul>
                                {product.reviews.map(review => (
                                    <li key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating rating={review.rating} caption=" "></Rating>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </li>
                                ))}
                                <li>
                                    {userInfo ? (
                                        <form className="form" onSubmit={submitHandler}>
                                            <div>
                                                <h2>Write customer Review</h2>
                                            </div>
                                            <div>
                                                <label htmlFor="rating">Rating</label>
                                                <select id="rating" value={rating} onChange={e => setRating(e.target.value)}>
                                                    <option value="">Select...</option>
                                                    <option value="1">1- Poor</option>
                                                    <option value="2">2- Fair</option>
                                                    <option value="3">3- Good</option>
                                                    <option value="4">4- Very Good</option>
                                                    <option value="5">5- Excelent</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="comment">Comment</label>
                                                <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)}></textarea>
                                            </div>
                                            <div>
                                                <button type="submit" className="primary">
                                                    Submit
                                                </button>
                                            </div>
                                            {loadingReview && <LoadingBox></LoadingBox>}
                                            {errorReview && (<MessageBox variant="danger">{errorReview}</MessageBox>)}
                                        </form>
                                    ) : (
                                        <MessageBox>
                                            Please <Link to ="/signin">Sign In</Link> to write Review
                                        </MessageBox>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}            
        </div>
        
    )
}
