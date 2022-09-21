const mongoose = require('mongoose')
var Schema = mongoose.Schema

const userSchema = new Schema({
        fname:{
            type:String,
            required:true,
        },
        lname:{
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
module.exports = mongoose.model('user',userSchema)