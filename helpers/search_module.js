var articleController = require("../controllers/Article");
var columnController = require("../controllers/Column");

async function search(term){
    let articles = await articleController.search_by_term(term);
    let columns = await columnController.search_by_term(term);
    /*formatear aquí para devolver 
    un mismo tipo para la caja de busqueda*/
    console.log("COLO",columns)

    return articles;


}

module.exports = {
    search
}