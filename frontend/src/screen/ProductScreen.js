import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function ProductScreen(props) {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    const productId = props.match.params.id
    const productDetail = useSelector(state => state.productDetail)
    const {loading, product, error} = productDetail

    useEffect(() => {
        dispatch(detailProduct(productId))
    }, [dispatch, productId])
    
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
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
                    </div>
                )}            
        </div>
        
    )
}
