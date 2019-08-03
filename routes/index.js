var express = require('express');
var router = express.Router();
var article_control = require('../controllers/Article')

/* GET home page. */
router.get('/', async function(req, res, next) {
    let user = req.session.username;
    let articles = await article_control.get_articles();
    if (!user){
    res.render('index', {
        articles
        })} 
    else {
        res.render('index', {
            articles,
            user
        })} 

    });


module.exports = router;
