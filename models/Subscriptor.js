var mongoose = require('mongoose');

let subscriptorSchema = mongoose.Schema({
    email : {
        type : String,
        required:true,
        unique:true
    }
})

let subscriptor = mongoose.model('subscriptor',subscriptorSchema);
module.exports = subscriptor;