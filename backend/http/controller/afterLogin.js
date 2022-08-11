const userSchema        = require('../../models/userSchema')
const employeeSchema    = require('../../models/employeeSchema')

async function user(req,res){
    const user = await userSchema.findOne({email:req.user.email})
    res.json(user)
}

async function createEmployee(req,res){
    const {name,department,salary} = req.body
    const employee  = await employeeSchema.create({name,department,salary})
    const user      = await userSchema.findOne({email:req.user.email})
    user.employees.push(employee)
    employee.user = user
    await user.save()
    await employee.save()
    res.json(employee)
}

async function employees(req,res){
    let users = await employeeSchema.find({user:req.user.user_id}).sort(req.query)
    res.json(users)
}

async function getEmployee(req,res){
    const {id} = req.params
    const employee = await employeeSchema.findById(id)
    res.json(employee)
}

async function updateEmployee(req,res){
    const {id,name,department,salary}  = req.body
    const employee                  = await employeeSchema.updateOne({_id:id},{$set: {name,department,salary}})
    res.json(employee)
}

async function deleteEmployee(req,res){
    const {id} = req.params
    await employeeSchema.deleteOne({_id:id})
    res.json({id:id})

}



module.exports = {
    user            : user,
    createEmployee  : createEmployee,
    getEmployee     : getEmployee,
    updateEmployee  : updateEmployee,
    employees       : employees,
    deleteEmployee  : deleteEmployee
}