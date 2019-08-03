var express = require('express');
var router = express.Router();
var adminControl = require('../controllers/Author');
var validator = require('validator');
var flash = require('connect-flash');
var upload = require('../config/multer');
var categoryControl = require('../controllers/Category');


router.post('/', async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;  
  let eq = req.flash('Usuario Inexistente');
  ;
  if (!validator.isAscii(username)){
     }else {
        let user = await adminControl.get_author(username,password);
           if (!user) {
               res.render('admin', {
                   eq
               })

           } else {
               req.session.username = username;
               res.redirect('/');
           }
        
     }

    });

router.get('/',function(req,res,next){
    res.render('admin');
})
router.get('/new',async function(req,res,next){
    let categories = await categoryControl.get_categories()
    console.log('categorias',categories);
    res.render('insertNew',{
        categories
    });
})
router.post('/new', upload.array('file',3),async function(req,res,next){
    console.log('REQUEST :: ',req.body);
    console.log('REQUEST :: ',req.files);
    
})

module.exports = router;
