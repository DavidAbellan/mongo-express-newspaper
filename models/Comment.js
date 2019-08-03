var mongoose = require('mongoose');

let commentsSchema = mongoose.Schema({
    author : {
        type : String,
        required:true,
    },
    comment : {
        type: String,
        required:true
    },
    post_id : {
        type : Object,
        required: true
    }
})

let comment = mongoose.model('comment',commentsSchema);
module.exports = comment;