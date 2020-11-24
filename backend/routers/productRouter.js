import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../Data.js'
import Product from '../models/productModel.js'
import {isAuth, isAdmin} from '../utils.js'

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.send(products)
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdProduct = await Product.insertMany(data.products)
    res.send({createdProduct})
}))

productRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)    
    }else{
        res.status(400).send({message: 'Product Not Found'})
    }
    
}))

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const product = new Product({
        name: "sample name" + Date.now(),
        price: 0,
        image: '/images/1.jpg',
        brand: "sample brand",
        category: "sample category",
        description: "sample description",
        countInStock: 0,
        rating: 4.5,
        numReviews: 0

    })
    const createdProduct = await product.save()
    res.send({message: "New Product Created", product: createdProduct})
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
        product.name= req.body.name
        product.price= req.body.price
        product.image= req.body.image
        product.category= req.body.category
        product.countInStock= req.body.countInStock
        product.brand= req.body.brand
        product.description= req.body.description

        const updateProduct = await product.save()
        res.send({message: 'Product Updated', product: updateProduct})
        
    }else{
        res.status(404).send({message: 'Product Not found'})
    }

}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
        const deleteProduct = await product.remove()
        res.send({message: 'Product deleted', product: deleteProduct})
    }else{
        res.status(404).send({message: 'Product Not found'})
    }
}))

export default productRouter