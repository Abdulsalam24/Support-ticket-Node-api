const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")
const Note = require("../models/noteModel")


const getNotes = asyncHandler(async (req, res) => {
    //check if it the user
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const notes = await Note.find({ticket : req.params.ticketId})

    res.status(200).json(notes)
})


const createNote = asyncHandler(async (req, res) => {
    //check if it the user
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const note = await Note.create({
        ticket : req.params.ticketId,
        text: req.body.text,
        user : req.user.id,
        isStaff: false,
    })

    res.status(201).json(note)
})



const updateNote = asyncHandler(async (req, res) => {
    // //check if it the user
    // const user = await User.findById(req.user.id)

    // if (!user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // const ticket = await Ticket.findById(req.params.ticketId)
    // console.log(ticket , 'ticket leleyi')
    // if(ticket.user.toString() !== req.user.id){
    //     res.status(401)
    //     throw new Error('user not authorized')
    // }

    // const updatedNote = await Note.findByIdAndUpdate(req.params.ticketId , req.body , {new : true})

    // res.status(200).json(updatedNote)
})


module.exports = {
    getNotes,
    createNote,
    updateNote
}