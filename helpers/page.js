var modArticle = require('../models');
var modColumn = require('../models');
var contrArticle = require('../controllers/Article');
var contrColumn = require('../controllers/Column');

async function page(pageNumber) {
     const pageSize = 10;
     let offset = pageNumber;
     let limit = pageSize;

    let articles = await modArticle.article.findAll(
        {
        order: [['createdAt','DESC']],
        limit: limit,
        offset: offset,
        subQuery : false

    });
    

    return articles;

}
async function column(pageNumber) {
    if (pageNumber > 0) {
        pageNumber = pageNumber/5;
        
    }
    const pageSize = 2;
    let offset = pageNumber ;
    let limit = pageSize;

   let columns = await modColumn.opinion_column.findAll({
    order: [['createdAt','DESC']],
    limit: limit,
    offset: offset,
    subQuery : false



});

   return columns;

}
async function total_pages () {
    let articles = await contrArticle.get_articles();
    let columns = await contrColumn.get_columns();
    let total = articles.length + columns.length;
    total = total / 10;
    return total;


}
 
module.exports = {
    page,
    column,
    total_pages
}