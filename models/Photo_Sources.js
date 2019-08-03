var mongoose = require('mongoose');

let photoSourceSchema = mongoose.Schema({
    id : {
        type : String,
        required:true,
        unique:true
    },
    url : {
        type: String,
        required:true,
        unique:true
    },
    photoAuthor : {
        type : String,
        default : 'archive.org'
    }
})

let photo = mongoose.model('photo',photoSourceSchema);
module.exports = photo;