
var modArticle = require('../models/Article');

async function get_articles(){
    return await modArticle.find();
}
async function set_article(article) {
    let newArticle = await new modArticle ({
        title : article.title,
        main_text : article.main_text,
        photo : article.photo,
        upload_at : Date.now(),
        author_id: article.author_id,
        outstanding : article.outstanding,
        category_code : article.category_code

    }).save();

}

module.exports = {
    get_articles,
    set_article
}


