const mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
    },
    SUM_of_account2: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Input', InputSchema);