import Axios from 'axios' 
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL } from '../constants/productConstants'

export const listProducts = ({seller= '', name= '', category= '', min = 0, max = 0, rating = 0, order = ''}) => async(dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const {data} = await Axios.get(`/api/product?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}
export const listProductsCategories = () => async(dispatch) => {
    dispatch({
        type: PRODUCT_LIST_CATEGORY_REQUEST
    });
    try {
        const {data} = await Axios.get(`/api/product/categories`)
        dispatch({
            type: PRODUCT_LIST_CATEGORY_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_CATEGORY_FAIL,
            payload: error.message
        })
    }
}

export const detailProduct = (productId) => async(dispatch) => {
    dispatch({
        type: PRODUCT_DETAIL_REQUEST
    });
    try {
        const {data} = await Axios.get(`/api/product/${productId}`)
        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const createProduct = () => async(dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REQUEST})
    const {userSignin: {userInfo}} = getState()
    
    try {
        const {data} = await Axios.post('/api/product', {},{
            headers: {Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product})
        
    } catch (error) {
        const message = error.response && error.response.data.message ? 
        error.response.data.message : error.message
        dispatch({type: PRODUCT_CREATE_FAIL, payload: message})
    }

}

export const updateProduct = (product) => async(dispatch, getState) => {
    dispatch({type: PRODUCT_UPDATE_REQUEST, payload: product})
    const {userSignin: {userInfo}} = getState()
    try {
        const {data} = await Axios.put(`/api/product/${product._id}`, product, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message ? 
        error.response.data.message : error.message
        dispatch({type: PRODUCT_UPDATE_FAIL, payload: message})
    }
    
}

export const deleteProduct = (productId) => async(dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId})
    const {userSignin: {userInfo}} = getState()
    try {
        const {data} = await Axios.delete(`/api/product/${productId}`,{
            headers: {Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message ? 
        error.response.data.message : error.message
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: message})
        
    }
}