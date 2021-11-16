var catArtController = require("../controllers/ArticleCategory");

async function get_categories(idArticle) {
    return await catArtController.get_categories_from_article(idArticle);


}
module.exports = {
    get_categories
}