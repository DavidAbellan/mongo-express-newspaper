var modArticle = require('../models/Article');
var modColumn = require('../models/Opinion_Columns');

async function page(pageNumber) {
     const pageSize = 5;
     let offset = pageNumber * pageSize;
     let limit = pageSize;

    let articles = await modArticle.find().sort({upload_at:-1}).limit(limit).skip(offset);

    return articles;

}
async function column(pageNumber) {
    const pageSize = 2;
    let offset = pageNumber * pageSize;
    let limit = pageSize;

   let columns = await modColumn.find().sort({upload_at:-1}).limit(limit).skip(offset);

   return columns;

}
 
module.exports = {
    page,
    column
}