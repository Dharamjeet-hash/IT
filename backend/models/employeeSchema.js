const mongoose      = require('mongoose');
const connection    = require('../config/dbconn')
 
const EmployeeSchema = new mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String,
    is_admin:{
        type:Boolean,
        default:false
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


const Employee = connection.model('Employee', EmployeeSchema);
 
module.exports = Employee