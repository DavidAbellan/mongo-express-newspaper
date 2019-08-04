var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

let authorSchema = mongoose.Schema({
    name : {
        type : String,
        required:true,
        unique:true
    },
    username : {
        type: String,
        unique:true,
        required:true
    },
    password : {
        type : String,
        trim : true
    },
    avatar : {
        type : Array
    } ,
    root : {
        type : Boolean,
        default:false
    },
    columns : {
        type : Array 
    }
})
authorSchema.methods.getJWT = function() {
    return new Promise ((resolve,reject) => {
        let admin = {
            username
        }
        jwt.sign(admin, 'private key', {expiresIn:'1h'}, function(error,token){
            if(error) {
                reject(error);
            } else {
                resolve(token);
            }

        })
    })
}

let author = mongoose.model('author',authorSchema);
module.exports = author;