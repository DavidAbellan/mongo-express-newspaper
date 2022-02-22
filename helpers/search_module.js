var articleController = require("../controllers/Article");
var columnController = require("../controllers/Column");
var photoController = require("../controllers/Photo");

async function search(term){
    let articles = await articleController.search_by_term(term);
    let columns  = await columnController.search_by_term(term);
    let result = articles.concat(columns);

return result;
}
async function getColums( author_id){
    return await columnController.get_column_by_author(author_id);

}

module.exports = {
    search,
    getColums
}