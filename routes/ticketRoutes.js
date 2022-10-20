const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { getTickets, getTicket, deleteTicket, createTicket, updateTicket } = require("../controllers/ticketController")

const router = express.Router()

const noteRouter = require("./noteRoutes")

router.use("/:ticketId/note" , noteRouter)

router.route("/").get(protect, getTickets).post(protect, createTicket)

router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router