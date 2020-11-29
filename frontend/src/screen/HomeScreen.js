import React, { useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel'
import Product from '../components/Product' 
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { listTopSeller } from '../actions/userAction'
import { Link } from 'react-router-dom'

export default function HomeScreen() {
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList
    
    const userTopSellerList = useSelector(state => state.userTopSellerList)
    const {loading: loadingSeller, error: errorSeller, users: sellers} = userTopSellerList

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts({}))
        dispatch(listTopSeller())
        
    }, [dispatch])
    return (
        <div>
            <h2>Top Sellers</h2>
            {loadingSeller ? (<LoadingBox> </LoadingBox> 
            ): errorSeller ? (<MessageBox variant="danger">{errorSeller}</MessageBox>
            ) : (
                <>
                {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                <Carousel showArrows autoPlay showThumbs={false} >
                    {sellers.map(seller => (
                        <div key={seller._id}>
                            <Link to={`/seller/${seller._id}`}>
                                <img src={seller.seller.logo} alt={seller.seller.name}/>
                                <p className="legend">{seller.seller.name}</p>
                            </Link>
                        </div>
                    ))}
                </Carousel>
                </>
            )
            }
            {loading? (<LoadingBox></LoadingBox>)
            : error? (<MessageBox variant="danger">{error}</MessageBox>):
                (
                    <>
                        {products.length === 0 && <MessageBox>No Product Found</MessageBox> }
                        <div className="row center">
                        {products.map(product => (
                            <Product key={product._id} product = {product} />
                        ))}
                        </div>
                    </>
                )
            }
            
        </div>
        
    )
}
