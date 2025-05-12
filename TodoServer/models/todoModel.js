const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todo: {
        type:String,
        required:true,
        minLength:3
    },
    completed: {
        type:Boolean,
        default: false
    }, 
},{
    timestamps:true,
})
module.exports = mongoose.model("Todo",todoSchema)