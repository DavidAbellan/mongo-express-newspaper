var express = require('express');
var router = express.Router();
var adminControl = require('../controllers/Author');
var validator = require('validator');
var upload = require('../config/multer');
var categoryControl = require('../controllers/Category');
var articleCategoryControl = require('../controllers/ArticleCategory');
var articleControl = require('../controllers/Article');
var photoControl = require('../controllers/Photo');
var columnControl = require('../controllers/Column');
var helpHighLight= require('../helpers/set_highlight');
var isLogged = require('../middleware/isLogged');
var token = require('../services/token');
var LS = require('local-storage');
var idgen = require('../helpers/id_generator');
var removeArticle = require('../helpers/remove_article');
var removeColumn = require('../helpers/remove_column');
var updatePictures = require('../helpers/update_pictures');

router.post('/', async function(req, res, next) {
  let categories = await categoryControl.get_categories()
  let username = req.body.username;
  let password = req.body.password;  
 
  /*if (!validator.isAscii(username)){
      /*res.redirect('/');
     }else {*/
        let user = await adminControl.get_author(username,password);
           if (!user) {
               res.render('admin', {
                    categories
               })

           } else {
               LS.clear();
               req.session.username = user.username;
               req.session.id_author = user.id;
               req.session.root = user.root;
               let tokenService = new token();
               let jwt = tokenService.generateToken(user);
               LS.set('token',jwt);
               res.redirect('/');
           }
        
     }

);
router.get('/login', async function(req,res,next){
res.render('admin');
})
router.get('/new' ,isLogged, async function(req,res,next){
    let categories = await categoryControl.get_categories()
    res.render('insertNew',{
        categories
    });
})
router.post('/new', isLogged, upload.array('file',3),async function(req,res,next){
    let pictures; 
    let art = false;
    let authId = req.session.id_author;
    let artID = idgen.get_random_id();
    let categories = req.body.categories;
    if (req.body.oustanding ==="on"){
        art = true
    }
    
    let post = new Object({
            id:artID,    
            title : req.body.title,
            main_text : req.body.main_text,
            author_id: authId,
            outstanding : art
        });
            
     
        
    if (req.files.length !== 0 && req.files != undefined) {
            pictures =req.files;
            for (picture of pictures){
                picture.id = idgen.get_random_id();
                picture.articleId = artID;
            }
            await photoControl.set_photos(pictures);
         
        } else {
             await photoControl.set_photo(artID);

        }

    if(typeof categories === 'string' || categories instanceof String) {
        if (categories != ""){
        await articleCategoryControl.set_relationship_article_category(categories,artID);
        }
    } else {
            for(let i = 0;i<categories.length; i++) {
                await articleCategoryControl.set_relationship_article_category(categories[i],artID);   
            }
    };        
    post.id = artID; 
    await articleControl.set_article(post);

    res.redirect('/');
    
})
router.get('/column',isLogged, function(req ,res){
    res.render('column');

})
router.post('/column', isLogged, async (req,res) =>{
    let authId =req.session.id_author;
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
       author_id : authId,
       upload_at : Date.now()
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
            await removeColumn.remove_column(req.body.column);
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
               await removeArticle.remove_article(req.body.article); 
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
    if(validator.isAlpha(req.body.main_text) && validator.isAlpha(req.body.title)){

    
    let column = new Object ({
        main_text : req.body.main_text,
        title : req.body.title,
        highlights : req.body.highlights
    });
    
    await columnControl.update_column(req.params.id,column)
};
    res.redirect('/');

})
router.post('/modify/art/:id', isLogged, upload.array('file',3),async function(req,res){

    //if (validator.isAlpha(req.body.title) && validator.isAlpha(req.body.main_text) &&
    //validator.isInt(req.body.category) && req.files) {
    let art;
    let pictures;
    if (req.body.oustanding ==="on"){
        art = true
    } else {
        art = false
    }
    if (req.files.length != 0) {
        pictures =req.files;
        await updatePictures.update_photos(req.params.id, pictures);
    } 


    let post = new Object({
        title : req.body.title,
        main_text : req.body.main_text,
        author_id: req.session.id_author,
        outstanding : art,
        category_code : req.body.category
    })

   
    await articleControl.update_article(req.params.id,post);


    res.redirect('/');
})

module.exports = router;
