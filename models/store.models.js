const mongoose = require('mongoose')
var Schema = mongoose.Schema

const storeSchema = new Schema({
    bookType:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    }
})
module.exports = mongoose.model('store',storeSchema)