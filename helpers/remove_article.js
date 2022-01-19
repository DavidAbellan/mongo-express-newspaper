var articleController = require("../controllers/Article");
var articleCategoryController = require("../controllers/ArticleCategory");
var photoController = require("../controllers/Photo");
async function remove_article(id){
    await articleController.remove_article(id);
    await articleCategoryController.delete_relationship_article(id);
    await photoController.delete_photos_from_article(id);
    return;

}
module.exports= {
    remove_article
}