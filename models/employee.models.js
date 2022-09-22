const mongoose = require('mongoose')
var Schema = mongoose.Schema
const bcrypt = require("bcrypt")

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
employeeSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

module.exports = mongoose.model('employee',employeeSchema)
