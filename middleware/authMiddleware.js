const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    //check if there is a Bearer token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //assign the token variable to Token in the req.header.authorization
            token = req.headers.authorization.split(' ')[1]

            //verify if the token is the right one 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //set the req user as the current one so it can be accesable
            req.user = await User.findById(decoded.id).select("-password")
            // console.log(req.user , 'req.user')
            next()

        } catch (error) {
            res.status(404)
            throw new Error ("Not Authorized")
        }
    }
    if(!token){
        res.status(404)
        throw new Error ("No Token")
    }
})



module.exports = {protect}