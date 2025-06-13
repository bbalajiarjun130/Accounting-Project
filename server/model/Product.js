const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    RowLabel: {
        type: String,
        required: true,
        trim: true
    },
    AccountId: {
        type: String,
    },
    Memo: {
        type: String,
    }
});

ProductSchema.index({ RowLabel: 1, AccountId: 1, Memo: 1}, { unique: true });

module.exports = mongoose.model('Product', ProductSchema);