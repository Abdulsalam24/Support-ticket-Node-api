const express = require("express")
const path = require("path")

const colors = require("colors")
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDb = require("./config/db")
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 5000

//call database
connectDb()

//initialize express
const app = express()

//middleware for passing json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes middleware
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))

//server frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res) => res.sendFile(__dirname, "../", "frontend", "build", "index.html"))
} else {
    //landing page
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Welcome to the landing" })
    })
}

//error middleware
app.use(errorHandler)

//listneing to port 5000
app.listen(PORT, () => console.log(PORT))
