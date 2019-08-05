var express = require('express');
var router = express.Router();
var article_control = require('../controllers/Article');
var column_control = require('../controllers/Column');
var formatArt = require('../helpers/format_article');

/* GET home page. */
router.get('/', async function(req, res, next) {
    let user = req.session.username;
    let articles = await article_control.get_articles();
    articles = formatArt.format(articles);
   
    let columns = await column_control.get_columns();
    if (!user){
    res.render('index', {
        articles,
        columns
        })} 
    else {
        res.render('index', {
            articles,
            columns,
            user
        })} 

    });


module.exports = router;
