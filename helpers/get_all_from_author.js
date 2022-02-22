var articleController = require('../controllers/Article');
var columnController = require('../controllers/Column');

async function getPosts(id){
    let articles = await articleController.get_articles_by_author(id);
    let columns = await columnController.get_column_by_author(id);
    let result = articles.concat(columns);

    return result ;

}
module.exports={ getPosts
};