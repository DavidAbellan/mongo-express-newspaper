var express = require('express');
var router = express.Router();
var article_control = require('../controllers/Article');
var column_control = require('../controllers/Column');
var categoryControl = require('../controllers/Category');
var authorController = require('../controllers/Author');
var formatArt = require('../helpers/format_article');
var formatCol = require('../helpers/format_column');
var formatHour = require('../helpers/format_hour');
var getAllFromCtgry = require('../helpers/get_all_from_category');
var getRelArt = require('../helpers/get_related_articles');
var moment = require('moment');
var pagination = require('../helpers/page');
var search_fun = require('../helpers/search_post');
var ls = require('local-storage');
var page ;
let articles = [];
var nextPage = true ;
var backPage = false;

/* GET home page. */
router.get('/', async function(req, res, next) {
    
    if (!ls.get('page')|| page === 0){
        ls.set('page',0);
        page = 0;
        backPage=false;
    }else {
        page = ls.get('page');
        backPage = true;
    }
    let total_pages = await pagination.total_pages();
    total_pages = Math.ceil(total_pages);
    total_pages --;
    
    if (total_pages <= (page + 1)  ) {
        nextPage = false; 
    } else {
        nextPage = true;
    }
    let art = await pagination.page(page);
    articles = await formatArt.format(art);
    let timer = moment().format('MMMM Do YYYY, h:mm:ss a');
    let columns = await pagination.column(page);
    columns = await formatCol.format(columns)
    let authors = await authorController.get_authors();
    let categories = await categoryControl.get_categories();
    let user = req.session.username;
    if (!user){
    res.render('index', {
        timer,
        articles,
        columns,
        categories,
        authors,
        nextPage,
        backPage
        
        })} 
    else {
        res.render('index', {
            timer,
            articles,
            columns,
            user,
            categories,
            authors,
            nextPage,
            backPage
           
        })} 

    });
router.get('/next', function(req,res,next){
    let numberPage = ls.get('page');
    numberPage = + numberPage +  1;

    ls.set('page',numberPage);
    page = numberPage; 
   
    res.redirect('/');    
})    
router.get('/back', function(req,res,next){
    let numberPage = ls.get('page');
     + numberPage --;
    ls.set('page',numberPage);
    page = numberPage; 
    
    res.redirect('/');    
}) 
router.post('/search', async function(req,res,next) {
    let lookin = req.body.lookin;
    let posts = await search_fun.search(lookin);
    if (posts) {  
    res.render('searchGrid', {
        posts,
        lookin
    })
    } else {
     res.redirect('/');   
    }

    
    
} ) 
router.get('/hst/:code',async function(req,res,next){
    let code = req.params.code;
    let categoryName;
    let posts;
    if (code.toString().length < 4) {
    let category = await categoryControl.get_category_by_code(code);
    categoryName = category[0].name;
    posts = await getAllFromCtgry.sendPosts(code);
    posts = formatArt.format(posts);
   
} else {
    posts = await column_control.get_column_by_author(code);
    let author = await authorController.get_author_by_id(code);
    categoryName = author.name;
   
    }
    res.render('searchGrid',{
        posts,
        categoryName
} )
   


    
} )  

router.get('/art/:id' ,async function(req,res,next){
    let article = await article_control.get_article_by_id(req.params.id);
    let author = await authorController.get_author_by_id(article.author_id);
    let time = formatHour.format(article.upload_at);
    let category =  await categoryControl.get_category_by_code(article.category_code);
    let posts =  await getRelArt.get_related(article);
    res.render('artDetail', {
        category,
        article,
        author,
        time,
        posts
    })

})
router.get('/col/:id', async(req,res,next)=>{
    let column = await column_control.get_column_by_id(req.params.id);
    let author = await authorController.get_author_by_id(column.author);
    res.render('colDetail',{
        author,
        column
    })


})


module.exports = router;
