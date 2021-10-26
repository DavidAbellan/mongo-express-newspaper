const Multer = require('multer');
 const storage = Multer.diskStorage({ 
         destination: (req, file, callback) => {
           if( req.body.name !== null && req.body.surname !== null) {
              callback(null, './public/images/profiles');  
           }else{
             callback(null, './public/images'); 
             
           };
          
        },    
         filename: (req, file, callback) => {        
              callback(null, String.fromCharCode(97 + Math.random() * 10) + Date.now() + file.originalname);     
            } 
        }); const upload = Multer({storage}); 
 module.exports = upload; 