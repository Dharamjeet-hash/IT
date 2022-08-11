const userSchema        = require('../../models/userSchema')
const employeeSchema    = require('../../models/employeeSchema')

async function user(req,res){
    const userCar = await userSchema.findOne({email:req.user.email}).populate('cars')
    res.json(userCar)
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

async function getEmployee(req,res){
    const {id} = req.params
    const employee = await employeeSchema.findById(id)
    res.json(employee)
}

async function updateEmployee(req,res){
    const {name,department,salary}  = req.body
    const {id}                      = req.params
    const employee                  = await employeeSchema.updateOne({_id:id},{$set: {name,department,salary}})
    const user                      = await userSchema.findOne({email:req.user.email})
    user.employees.push(employee)
    await user.save()
}

async function employees(req,res){
    let users = await employeeSchema.find({email:req.user.email})
    res.json(users)
}

module.exports = {
    user            : user,
    createEmployee  : createEmployee,
    getEmployee     : getEmployee,
    updateEmployee  : updateEmployee,
    employees       : employees
}