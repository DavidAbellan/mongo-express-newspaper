var mongoose = require('mongoose');

let categoriesSchema = mongoose.Schema({
    name : {
        type : String,
        required:true,
        unique:true
    },
    code : {
        type : Number,
        required:true,
        unique:true
    }
})

let category = mongoose.model('category',categoriesSchema);
module.exports = category;