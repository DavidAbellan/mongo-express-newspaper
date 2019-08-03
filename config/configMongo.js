let moongose = require('mongoose');

class configMongo {
    static connection() {

        return moongose.connect('mongodb://localhost:27017/fakenews_db',{useNewUrlParser:true});
        
  
    }

};


module.exports = configMongo;
