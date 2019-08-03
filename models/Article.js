var mongoose = require('mongoose');

let articleModel = mongoose.Schema({
   
    title : {
        type: String,
        required : true
        
    },
    main_text : {
        type : String,
        required : true
    
    },
    photo : {
        type : Array 
    }, 
    upload_at : {
        type : Date
    },
    author_id : {
        type : Number
    },
    outstanding : {
        type : Boolean,
        default : false
    },
    category_code : {
        type : Number,
        required: true
    }
   
})
let article = mongoose.model('article',articleModel);
module.exports = article;