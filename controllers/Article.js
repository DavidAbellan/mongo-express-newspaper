
var modArticle = require('../models/Article');

async function get_articles(){
    return await modArticle.find();
}

module.exports = {
    get_articles
}


