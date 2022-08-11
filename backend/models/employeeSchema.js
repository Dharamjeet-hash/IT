const mongoose      = require('mongoose');
const connection    = require('../config/dbconn')
 
const EmployeeSchema = new mongoose.Schema({
    name:String,
    department:String,
    salary:Number,
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


const Employee = connection.model('Employee', EmployeeSchema);
 
module.exports = Employee