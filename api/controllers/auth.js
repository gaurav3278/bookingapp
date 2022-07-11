import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req,res,next)=>{
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt)


        const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save()
        res.status(200).send('User created successfully')
        
    } catch (error) {
        next(error)
    }
}
export const login = async (req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, 'User not found'))

        const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrectPass) return next(createError(400, 'Incorrect password or username'))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const {password, isAdmin, ...otherDetail} = user._doc
        res.cookie("access_token", token,{
            httpOnly:true,
        }).status(200).json({...otherDetail})
        
    } catch (error) {
        next(error)
    }
}