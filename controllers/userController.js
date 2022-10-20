const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {

    //check if user credntial available
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please enter field")
    }

    //check if user Exist
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedpassword,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("User data wrong")
    }
})



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check if user is already registered
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Bad Credential')
    }
})

const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}
