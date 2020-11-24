import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { signout } from './actions/userAction';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
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
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import SigninScreen from './screen/SigninScreen';


function App() {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const dispatch = useDispatch()
    const signoutHandler =() => {
        dispatch(signout())
    }
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link to="/" className="brand">amazona</Link>
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
                <main>
                    <Route  path="/cart/:id?" component={CartScreen}></Route>
                    <Route exact path="/product/:id" component={ProductScreen}></Route>
                    <Route exact path="/product/:id/edit" component={ProductEditScreen}></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingAddressScreen}></Route>
                    <Route path="/payment" component={PaymentMethodScreen}></Route>
                    <Route path="/placeOrder" component={PlaceOrderScreen}></Route>
                    <Route path="/order/:id" component={OrderScreen}></Route>
                    <Route path="/orderHistory" component={OrderHistoryScreen}></Route>
                    <Route path="/orderList" component={OrderListScreen}></Route>
                    <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
                    <AdminRoute exact path="/productlist" component={ProductListScreen}></AdminRoute>
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
