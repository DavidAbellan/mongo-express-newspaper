var mod = require('../models');


async function update_article(id,article){
    
    await mod.article.update({_id : id}, {
        title : article.title,
        main_text : article.main_text,
        photo : article.photo,
        outstanding : article.outstanding,
        category_code : article.category_code
    })
}

async function get_articles(){
    return await mod.article.findAll();
}
async function get_articles_by_category(code){
    return await mod.article.find({category_code : code});

}
async function set_article(article) {
  
    let newArticle = new article ({
        title : article.title,
        main_text : article.main_text,
        photo : article.photo,
        upload_at : Date.now(),
        author_id: article.author_id,
        outstanding : article.outstanding,
        category_code : article.category_code

    });
    mod.article.create(newArticle);

}
async function remove_article(id){
    return await mod.article.findByPk(id).destroy();
}
async function get_article_by_id(id){
    return await mod.article.findByPk(id);
}
module.exports = {
    get_articles_by_category,
    get_articles,
    set_article,
    remove_article,
    get_article_by_id,
    update_article
}


