
const mongoose = require('mongoose');

async function connectToMongoDB(url){
    try{
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
        console.log('Failed to connect to MongoDB');
    }
}

module.exports = connectToMongoDB;