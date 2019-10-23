var mongoose = require('mongoose');

let columnSchema = mongoose.Schema({
    main_text : {
        type : String,
        required:true,
    },
    highlights : {
        type: String
    },
    title : {
        type : String,
        required: true
    },
    author : {
        type : String,
        required:true
    },
    upload_at : {
        type : Date
    }


})

let opinion = mongoose.model('opinion_column',columnSchema);
module.exports = opinion;