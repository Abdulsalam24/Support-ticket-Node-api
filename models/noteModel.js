const moongose = require("mongoose")


const noteSchema = moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ticket: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        required: [true, 'Please add a note'],
    },
    staffId: {
        type: Boolean,
    },

},
    {
        timestamps: Date.now,
    },
)

module.exports = moongose.model('Note', noteSchema)
