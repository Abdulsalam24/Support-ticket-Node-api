const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")


const getTickets = asyncHandler(async (req, res) => {

    //check if it the user
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})


const createTicket = asyncHandler(async (req, res) => {

    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error("Product or description is not filled")
    }

    const user = User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "new"
    })

    res.status(201).json(ticket)
})


const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(400)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("not authorized")
    }

    res.status(200).json(ticket)
})

const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(400)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("ticket not found")
    }

    await Ticket.deleteOne()

    res.status(200).json({ message: "success" })
})

const updateTicket = asyncHandler(async (req, res) => {
    const { description, status } = req.body

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("ticket not found")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, { description,status }, { new: true })

    res.status(200).json(updatedTicket)
})



module.exports = {
    getTickets, createTicket, getTicket, deleteTicket, updateTicket
}