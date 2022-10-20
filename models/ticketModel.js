const moongose = require("mongoose")


const ticketSchema = moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['apple', "macBook Pro", 'ipad', 'iphone', 'samsung', 'techno', 'infinix', 'itel'],
    },

    description: {
        type: String,
        required: [true, 'Please enter a description of the issue'],
    },

    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    },

},
    {
        timestamps: Date.now,
    },
)

module.exports = moongose.model('Ticket', ticketSchema)
