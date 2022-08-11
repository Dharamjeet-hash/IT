const userSchema    = require('../../models/userSchema')
const bcrypt        = require('bcryptjs');
const jwt           = require("jsonwebtoken");

async function register(req,res){
    const {name, email, password}   = req.body
    const user                      = await userSchema.register({ username:name, email: email, active:true}, password);
    // Create token
    const token = jwt.sign({ user_id: user._id, email },"crud",{expiresIn: "2h"});
    // return new user
    res.status(201).json({
        user,
        token
    });
}

async function login(req,res){
    let email       = req.body.email
    let user        = await userSchema.findOne({ email });
     // Create token
     const token = jwt.sign({ user_id: user._id, email },"crud",{expiresIn: "2h"});
     // return new user
     res.status(201).json({
         user,
         token
     });

}


module.exports = {
    register:register,
    login:login
}
