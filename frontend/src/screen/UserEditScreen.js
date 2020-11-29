import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUser } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstant'

export default function UserEditScreen(props) {
    const userId = props.match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSeler, setIsSeler] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {user, loading, error} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {success: successUpdate, loading: loadingUpdate, error: errorUpdate} = userUpdate
    const dispatch = useDispatch()
    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            props.history.push(`/userlist`)
        }
        if (!user || user._id !== userId || successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            dispatch(detailsUser(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsSeler(user.isSeler)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, userId, user, props.history, successUpdate])
    const submitHandler = (e) => {
        
        e.preventDefault();
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isSeler,
            isAdmin
        }))
        // console.log(isAdmin);
    }
    
    
    return (
        <div>
            <form className="form">
                <div>
                    <h1>Edit User</h1>
                    {loadingUpdate && (<LoadingBox></LoadingBox>)}
                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                </div>
                {loading ? (<LoadingBox></LoadingBox>
                    ): error ? (<MessageBox variant="danger">{error}</MessageBox>
                    ): (
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="isSeler">Is Seller</label>
                                <input type="checkbox" id="isSeler" checked={isSeler} onChange={(e) => setIsSeler(e.target.checked)}/>
                            </div>
                            <div>
                                <label htmlFor="isAdmin">Is Admin</label>
                                <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}/>
                            </div>
                            <div>
                                <button type="submit" className="primary" onClick={submitHandler}>Update</button>
                            </div>
                        </>
                    )
                    }
                
            </form>
        </div>
    )
}
