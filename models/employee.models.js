const mongoose = require('mongoose')
var Schema = mongoose.Schema

const employeeSchema = new Schema({
    employeeFname:{
        type:String,
        required:true,
    },
    employeeLname:{
        type:String,
        required:true,
    },
    employeeType:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
    
})
module.exports = mongoose.model('employee',employeeSchema)
