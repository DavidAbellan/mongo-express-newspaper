var articleController = require('../controllers/Article');
var columnController = require('../controllers/Column');
var authorController = require('../controllers/Author');
async function search(parameter) {
    let articles = await articleController.get_articles();
    let colums = await columnController.get_columns();
    let search_results = [];
    for(article of articles){
        if (article.title.toUpperCase().includes(parameter.toUpperCase())
        || article.main_text.toUpperCase().includes(parameter.toUpperCase()) ){
            let art = {
                title : article.title,
                id : article._id ,
                outstanding : article.outstanding,
                photo :'/images/' + article.photo[0].filename,
            }
            search_results.push(art);
        }
    }
    for (column of colums) {
        if (column.title.toUpperCase().includes(parameter.toUpperCase())
        || column.main_text.toUpperCase().includes(parameter.toUpperCase()) || 
        column.highlights.toUpperCase().includes(parameter.toUpperCase()) ){
            let id_author = column.author;
            let pic = await authorController.get_author_by_id(id_author);
            let c = {
                id : column.id,
                highlights : column.highlights,
                title : column.title,
                picture : pic.avatar[0]
                
            }
            search_results.push(c);
        }
        
}
//controlar mayúsculas y minúsculas

return search_results;  
}
module.exports = {
    search
}