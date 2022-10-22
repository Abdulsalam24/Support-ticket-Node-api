const { mongoose } = require("mongoose");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Conn  :${conn}`.green.underline.bold)

    } catch (error) {
        console.log(`Error  :${error.message}`.yellow.underline.bold)
    }
}


module.exports = connectDb
