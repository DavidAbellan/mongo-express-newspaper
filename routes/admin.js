var express = require('express');
var router = express.Router();
var adminControl = require('../controllers/Author');
var validator = require('validator');
var flash = require('connect-flash');
var upload = require('../config/multer');
var categoryControl = require('../controllers/Category');
var articleControl = require('../controllers/Article');
var columnControl = require('../controllers/Column');
var helpHighLight= require('../helpers/set_highlight')


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
               req.session.username = user.username;
               req.session.id_author = user._id;
               res.redirect('/');
           }
        
     }

    });

router.get('/',function(req,res,next){
    res.render('admin');
})
router.get('/new',async function(req,res,next){
    let categories = await categoryControl.get_categories()
    res.render('insertNew',{
        categories
    });
})
router.post('/new', upload.array('file',3),async function(req,res,next){
    let art;
    if (req.body.oustanding ==="on"){
        art = true
    } else {
        art = false
    }
    let post = new Object({
        title : req.body.title,
        main_text : req.body.main_text,
        photo : req.files,
        author_id: req.session.id_author,
        outstanding : art,
        category_code : req.body.category

    })
    await articleControl.set_article(post);
    res.redirect('/');
    
})
router.get('/column', function(req ,res){
    res.render('column');

})
router.post('/column', async function(req,res){
    let highlights = "";
    console.log('columna',req.session);
    if(req.body.highlights === ''){
      highlights = helpHighLight.find_highlight(req.body.main_text);  
    } else {
        highlights = req.body.highlights; 
    }

   let col = new Object ({
       main_text : req.body.main_text,
       highlights,
       title : req.body.title,
       author : req.session.id_author
   });
   await columnControl.set_column(col);
   res.redirect('/');
})

module.exports = router;
