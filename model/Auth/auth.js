
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    is_active:{
        type:Boolean,
        default:true
    },
    is_staff:{
        type:Boolean,
        default:false
    },
    is_superuser:{
        type:Boolean,
        default:false
    },

},{timestamps:true});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bycrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.checkPassword = async function(candidatePassword, userPassword){
    return await bycrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
