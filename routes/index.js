var express = require('express');
var router = express.Router();
var article_control = require('../controllers/Article');
var column_control = require('../controllers/Column');
var categoryControl = require('../controllers/Category');
var authorController = require('../controllers/Author');
var formatArt = require('../helpers/format_article');
var formatCol = require('../helpers/format_column');
var formatHour = require('../helpers/format_hour');
var moment = require('moment');
var pagination = require('../helpers/page');
var ls = require('local-storage');
var page ;
let articles = [];
//var infiniteScroll = new infiniteScroll('.page', {
//    path : () => page ++,
//    append : '.post',
//    history : false,

//})
/* GET home page. */
router.get('/', async function(req, res, next) {
    
    
    if (!ls.get('page')){
        ls.set('page',0);
        page = 0;
    }else {
        page = ls.get('page');
       
        
        
    }
    let art = await pagination.page(page);
    articles = formatArt.format(art);
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
        authors
        })} 
    else {
        res.render('index', {
            timer,
            articles,
            columns,
            user,
            categories,
            authors
        })} 

    });
router.get('/next',function(req,res,next){
    let numberPage = ls.get('page');
    numberPage = + numberPage +  1;
    ls.set('page',numberPage); 
    
  


res.redirect('/')    
})    


router.get('/art/:id' ,async function(req,res,next){
    let article = await article_control.get_article_by_id(req.params.id);
    let author = await authorController.get_author_by_id(article.author_id);
    let time = formatHour.format(article.upload_at);
    let category =  await categoryControl.get_category_by_code(article.category_code);
    console.log('articulo',article);

    res.render('artDetail', {
        category,
        article,
        author,
        time
    })

})
router.get('/col/:id', async(req,res,next)=>{
    let column = await column_control.get_column_by_id(req.params.id);
    let author = await authorController.get_author_by_id(column.author);
    console.log('Columna',column);
    res.render('colDetail',{
        author,
        column
    })


})


module.exports = router;
