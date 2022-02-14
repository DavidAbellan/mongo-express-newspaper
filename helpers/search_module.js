var articleController = require("../controllers/Article");
var columnController = require("../controllers/Column");
var photoController = require("../controllers/Photo");

async function search(term){
    let articles = await articleController.search_by_term(term);
    const posts = await Promise.all(
        articles.map(async (art) => {
             return await photoController.get_main_photo(art.id);
        })
    )
    for (article of articles) {
        for (p of posts){
            if (article.id == p.articleId) {
                article.photo = p.filename;
               
            } 
        }
    }
return articles;
}
async function getColums( author_id){
    return await columnController.get_column_by_author(author_id);

}

module.exports = {
    search,
    getColums
}