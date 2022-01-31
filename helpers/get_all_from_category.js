var articleController = require('../controllers/Article');
var articleCategoryController = require('../controllers/ArticleCategory');

async function sendPosts(CategoryCode) {
    let articles = await articleController.get_articles_by_category(CategoryCode);
    return articles;
   
}
async function gimmeTwoToOf(idOfCategory){
    let articleCategoriesArrayObjects = await articleCategoryController.get_two_articles_from_category(idOfCategory);
    /* Aqui llegan dos objetos articleCategoy,
    hay que recuperar los articulos (articleId) */
    let twoOfThem = [];
    for(artCat of articleCategoriesArrayObjects){
        let p = await articleController.get_article_by_id(artCat.articleID)
        if (p != null){
          twoOfThem.push(p);
        }
    }
   
    return twoOfThem;

}
module.exports = {
    sendPosts,
    gimmeTwoToOf
}