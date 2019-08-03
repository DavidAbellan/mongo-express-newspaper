var mongoose = require('mongoose');

let columnSchema = mongoose.Schema({
    main_text : {
        type : String,
        required:true,
    },
    highlights : {
        type: String,
        required:true
    },
    title : {
        type : String,
        required: true
    },
    author : {
        type : Object,
        required:true
    }

})

let opinion = mongoose.model('opinion_column',commentsSchema);
module.exports = opinion;