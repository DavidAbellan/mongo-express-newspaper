var articleController = require('../controllers/Article');

async function sendPosts(CategoryCode) {
    let articles = await articleController.get_articles_by_category(CategoryCode);
    return articles;
   
}
module.exports = {
    sendPosts
}