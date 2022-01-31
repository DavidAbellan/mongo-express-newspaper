const { post } = require("jquery");
var articleController = require("../controllers/Article");
var columnController = require("../controllers/Column");
var photoController = require("../controllers/Photo");

async function search(term){
    let articles = await articleController.search_by_term(term);
    let columns = await columnController.search_by_term(term);
    /*formatear aquí para devolver 
    un mismo tipo para la caja de busqueda*/

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

module.exports = {
    search
}