const mongoose      = require('mongoose');
const connection    = require('../config/dbconn')
const passportLocalMongoose = require('passport-local-mongoose');
 
const UserSchema = new mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String,
    is_admin:{
        type:Boolean,
        default:false
    },
    employees:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required: true
    }]
});

UserSchema.plugin(passportLocalMongoose);


const User = connection.model('User', UserSchema);
 
module.exports = User