import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { listProductsCategories } from './actions/productActions';
import { signout } from './actions/userAction';
import AdminRoute from './components/AdminRoute';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRoute';
import CartScreen from './screen/CartScreen';
import HomeScreen from './screen/HomeScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import OrderListScreen from './screen/OrderListScreen';
import OrderScreen from './screen/OrderScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import ProductListScreen from './screen/ProductListScreen';
import ProductScreen from './screen/ProductScreen';
import ProfileScreen from './screen/ProfileScreen';
import RegisterScreen from './screen/RegisterScreen';
import SearchScreen from './screen/SearchScreen';
import SellerScreen from './screen/SellerScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import SigninScreen from './screen/SigninScreen';
import UserEditScreen from './screen/UserEditScreen';
import UserListScreen from './screen/UserListScreen';


function App() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const productCategoryList = useSelector(state => state.productCategoryList)
    const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList
    
    const dispatch = useDispatch()
    const signoutHandler =() => {
        dispatch(signout())
    }
    useEffect(() => {
        dispatch(listProductsCategories())
    }, [dispatch])
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <button type="button" className="open-sidebar" onClick={() => setSidebarIsOpen(true)}><i className="fa fa-bars"></i></button>
                        <Link to="/" className="brand">amazona</Link>
                    </div>
                    <div>
                        <Route render={({history}) => (<SearchBox history={history}></SearchBox>)}></Route>
                    </div>
                    <div>
                        <Link to="/cart">
                            Cart
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )

                            }
                        </Link>
                        {
                            userInfo ? (
                                <div className="dropdown">
                                    <Link to="#">
                                        {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                    </Link>
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link to="/profile" >User Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/orderHistory" >Order History</Link>
                                        </li>
                                        <li>
                                            <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                        </li>
                                    </ul>
                                </div>
                            
                            ):(
                                <Link to="/signin">Sign In</Link>
                            )
                        }
                        {userInfo && userInfo.isSeler && (
                            <div className="dropdown">
                            <Link to="#admin">
                                Seller <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/productlist/seller">Product</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist/seller">Orders</Link>
                                </li>
                                
                            </ul>
                        </div>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Product</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderList">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        )}
                        
                    </div>
                </header>
                <aside className={sidebarIsOpen ? 'open' : ''}>
                    <ul className="categories">
                        <li>
                            <strong>Categories</strong>
                            <button type="button" onClick={() => setSidebarIsOpen(false)} className="close-sidebar"><i className="fa fa-close"></i></button>
                        </li>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                            ): errorCategories ? (
                                <MessageBox variant="danger">{errorCategories}</MessageBox>
                            ) :(
                                <ul>
                                    {categories.map(c => (
                                        <li key={c}>
                                            <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}>{c}</Link>
                                        </li>   
                                    ))}
                            </ul>
                            )
                            }
                    </ul>

                </aside>
                <main>
                    <Route  path="/cart/:id?" component={CartScreen}></Route>
                    <Route  path="/seller/:id" component={SellerScreen}></Route>
                    <Route exact path="/product/:id" component={ProductScreen}></Route>
                    <Route exact path="/product/:id/edit" component={ProductEditScreen}></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingAddressScreen}></Route>
                    <Route path="/payment" component={PaymentMethodScreen}></Route>
                    <Route path="/placeOrder" component={PlaceOrderScreen}></Route>
                    <Route path="/order/:id" component={OrderScreen}></Route>
                    <Route path="/orderHistory" component={OrderHistoryScreen}></Route>
                    <Route exact path="/search/name/:name?" component={SearchScreen}></Route>
                    <Route exact path="/search/category/:category" component={SearchScreen}></Route>
                    <Route exact path="/search/category/:category/name/:name" component={SearchScreen}></Route>
                    <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen}></Route>
                    <AdminRoute exact path="/orderList" component={OrderListScreen}></AdminRoute>
                    <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
                    <AdminRoute exact path="/productlist" component={ProductListScreen}></AdminRoute>
                    <AdminRoute exact path="/userlist" component={UserListScreen}></AdminRoute>
                    <AdminRoute exact path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
                    <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
                    <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
                    <Route exact path="/" component={HomeScreen}></Route>
                    
                </main>
                <footer className="row center">
                        All right reserved
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
