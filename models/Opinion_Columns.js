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
    }

})

let opinion = mongoose.model('opinion_column',columnSchema);
module.exports = opinion;