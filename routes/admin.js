var express = require('express');
var router = express.Router();
var adminControl = require('../controllers/Author');
var validator = require('validator');
var flash = require('connect-flash');
var upload = require('../config/multer');
var categoryControl = require('../controllers/Category');
var articleControl = require('../controllers/Article');
var columnControl = require('../controllers/Column');
var helpHighLight= require('../helpers/set_highlight');
var isLogged = require('../middleware/isLogged');

router.post('/', async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;  
  
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
               req.session.root = user.root;
               res.redirect('/');
           }
        
     }

    });

router.get('/',function(req,res,next){
    res.render('admin');
})
router.get('/new' ,async function(req,res,next){
    let categories = await categoryControl.get_categories()
    res.render('insertNew',{
        categories
    });
})
router.post('/new', isLogged, upload.array('file',3),async function(req,res,next){
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
router.post('/column', isLogged, async(req,res) =>{
    let highlights = "";
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
router.get('/modify',isLogged, async function (req,res){
    let articles =  await articleControl.get_articles();
    let columns = await columnControl.get_columns();
    res.render('modify', {
        articles,
        columns

    });

});
router.post('/modify',isLogged, async function (req,res){
if(req.body.article === undefined){
    if(req.body.column === undefined){
        res.redirect('/');
    } else {
        if(req.body.update === undefined){
            await columnControl.remove_column(req.body.column);
            res.redirect('/'); 
          }
          else {
             let column = await columnControl.get_column_by_id(req.body.column); 
             res.render('modColumn',{
                 column
             })
          }
    }
} else {
    if(req.body.update === undefined){ 
           await articleControl.remove_article(req.body.article);
               res.redirect('/');
           } 
           else {
               let categories = await categoryControl.get_categories();
               let article = await articleControl.get_article_by_id(req.body.article);
               res.render('modArticle', {
                   categories,
                   article
               })

           }
    }

});
router.post('/modify/col/:id', isLogged, async function(req,res){
    
    
    let column = new Object ({
        main_text : req.body.main_text,
        title : req.body.title,
        highlights : req.body.highlights
    });
    
    await columnControl.update_column(req.params.id,column);
    res.redirect('/');

})
router.post('/modify/art/:id', isLogged, upload.array('file',3),async function(req,res){
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
    await articleControl.update_article(req.params.id,post);

    res.redirect('/');
})

module.exports = router;
