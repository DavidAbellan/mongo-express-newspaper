const Multer = require('multer');
 const storage = Multer.diskStorage({ 
         destination: (req, file, callback) => {
                      callback(null, './public/images'); 
        },    
         filename: (req, file, callback) => {        
              callback(null, String.fromCharCode(97 + Math.random() * 10) + Date.now() + file.originalname);     
            } 
        }); const upload = Multer({storage}); 
 module.exports = upload; 