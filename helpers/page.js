var modArticle = require('../models');
var modColumn = require('../models');
var contrArticle = require('../controllers/Article');
var contrColumn = require('../controllers/Column');

async function page(pageNumber) {
     const pageSize = 10;
     let offset = pageNumber * pageSize;
     let limit = pageSize;

    let articles = await modArticle.article.findAll(
        /*{
        order: [[upload_at, ASC]],
        limit: limit,
        skip: offset

    }*/);

    return articles;

}
async function column(pageNumber) {
    const pageSize = 2;
    let offset = pageNumber * pageSize;
    let limit = pageSize;

   let columns = await modColumn.opinion_column.findAll(/*{
    order: [[upload_at, ASC]],
    limit: limit,
    skip: offset

}*/);

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