var express = require('express');
var router = express.Router();
var adminControl = require('../controllers/Author');
var validator = require('validator');
var flash = require('connect-flash');
var upload = require('../config/multer');
var categoryControl = require('../controllers/Category');
var articleControl = require('../controllers/Article')


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
               req.session.id = user._id;
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
    if (req.session.outstanding =="on"){
        art = true
    } else {
        art = false
    }


    let post = new Object({
        title : req.body.title,
        main_text : req.body.main_text,
        photo : req.body.file,
        author_id: req.session.id,
        outstanding : art,
        category_code : req.body.category

    })
    await articleControl.set_article(post);
    res.redirect('/');
    
})
router.get('/column', function(req ,res){
    res.render('column');

})
router.post('/column', function(req,res){
    console.log('BODY',req.body);
    console.log('session',req.session);
})

module.exports = router;
