import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant'

export default function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sellerName, setSellerName] = useState('')
    const [sellerLogo, setSellerLogo] = useState('')
    const [sellerDescription, setSellerDescription] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success:successUpdate, loading: loadingUpdate, error: errorUpdate} = userUpdateProfile

    const dispatch = useDispatch()
    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))
        }else{
            setName(user.name);
            setEmail(user.email);
            if (user.seller) {
                setSellerName(user.seller.name)
                setSellerLogo(user.seller.logo)
                setSellerDescription(user.seller.description)
            }
        }
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched')
        }
        else{
            dispatch(updateUserProfile({userId: user._id, name, email, password, sellerName, sellerLogo, sellerDescription}))
        }
        
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
            {loading? (
                <LoadingBox></LoadingBox>
                ): error ? (
                <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                    {successUpdate && (<MessageBox variant="success">Profile Update Succesfully</MessageBox>)}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="emaill" type="email" value={email} placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password"  placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Concfirm Password</label>
                        <input id="confirmPassword " type="password" placeholder="Enter confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {user.isSeler && (
                        <>
                            <h2>Seller</h2>
                            <div>
                                <label htmlFor="sellerName">Seller Name</label>
                                <input type="text" id="sellerName" placeholder="Enter Seller Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="sellerLogo">Seller Logo</label>
                                <input type="text" id="sellerLogo" placeholder="Enter Seller Logo" value={sellerLogo} onChange={(e) => setSellerLogo(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="sellerDescription">Seller Description</label>
                                <input type="text" id="sellerDescription" placeholder="Enter Seller Description" value={sellerDescription} onChange={(e) => setSellerDescription(e.target.value)}/>
                            </div>
                            
                        </>
                    )}
                    <div>
                        <button type="submit" className="primary">Update</button>
                    </div>
                    </>
                        
                )}
                
            </form>
        </div>
    )
}
