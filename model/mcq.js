
const mongoose = require('mongoose');

const mcqSchema = new mongoose.Schema({
    
    body: {
        type: String,
        required: true,
    },
    explanation:{
        type: String,
        required: true,
    },
    options: {
        type: [Object],
        required: true,
    },

}, { timestamps: true });
    
const Mcq = mongoose.model('Mcq', mcqSchema);
module.exports = Mcq;

