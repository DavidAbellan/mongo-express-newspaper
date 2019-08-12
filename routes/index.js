var express = require('express');
var router = express.Router();
var article_control = require('../controllers/Article');
var column_control = require('../controllers/Column');
var categoryControl = require('../controllers/Category');
var authorController = require('../controllers/Author');
var formatArt = require('../helpers/format_article');
var formatCol = require('../helpers/format_column');
var formatHour = require('../helpers/format_hour');


/* GET home page. */
router.get('/', async function(req, res, next) {
    let columns = await column_control.get_columns();
     formatCol.format(columns).then(resp => {
         columns = resp
     });
    let authors = await authorController.get_authors();
    let categories = await categoryControl.get_categories();
    let user = req.session.username;
    let articles = await article_control.get_articles();
    articles = formatArt.format(articles);
    if (!user){
    res.render('index', {
        articles,
        columns,
        categories,
        authors
        })} 
    else {
        res.render('index', {
            articles,
            columns,
            user,
            categories,
            authors
        })} 

    });

router.get('/art/:id' ,async function(req,res,next){
    let article = await article_control.get_article_by_id(req.params.id);
    let author = await authorController.get_author_by_id(article.author_id);
    let time = formatHour.format(article.upload_at);
    let category =  await categoryControl.get_category_by_code(article.category_code);
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
    res.render('colDetail',{
        author,
        column
    })


})


module.exports = router;
