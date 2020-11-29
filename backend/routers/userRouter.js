import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../Data.js'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import { generateToken, isAdmin, isAuth } from '../utils.js'

const userRouter = express()
userRouter.get('/top-sellers', expressAsyncHandler(async(req, res) => {
    const topSellers = await User.find({isSeler: true}).sort({'seller.rating':-1}).limit(3)
    res.send(topSellers)
    console.log(topSellers);
}))

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users)
    res.send({createdUsers})
}))

userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save()
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.mail,
        isAdmin: createdUser.isAdmin,
        isSeler: user.isSeler,
        token: generateToken(createdUser)

    })
    
}))
userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.mail,
                isAdmin: user.isAdmin,
                isSeler: user.isSeler,                
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({message: "Invalid email or password"})
}))
userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.send(user)
    }else{
        res.status(404).send({message: 'User not found'})
    }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (user.isSeler) {
            user.seller.name = req.body.sellerName || user.seller.name
            user.seller.logo = req.body.sellerLogo || user.seller.logo
            user.seller.description = req.body.sellerDescription || user.seller.description
        }
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
    }
    const updateUser = await user.save();
    res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        isSeler: user.isSeler,
        token: generateToken(updateUser),
    })

}))

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(users)
}))
export default userRouter

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isAdmin) {
            res.status(400).send({message: "Can not Delete Admin User"})
            return
        }
        const deleteUser = await user.remove()
        res.send({message: 'User deleted', user: {deleteUser}})
    }else{
        res.status(400).send({message: 'User not found'})
    }
}))

userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log(req.body.isAdmin);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isSeler = req.body.isSeler 
        user.isAdmin = req.body.isAdmin 
        const updateUser = await user.save()
        res.send({message: 'User Updated', user: updateUser})
    }else{
        res.status(400).send({message: 'User Not Found'})
    }
    
}))