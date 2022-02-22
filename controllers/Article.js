var mod = require('../models');
var Sequelize = require('sequelize');


async function update_article(id,article){
    
    await mod.article.update({id : id}, {
        title : article.title,
        main_text : article.main_text,
        photo : article.photo,
        outstanding : article.outstanding,
       
    })
}

async function get_articles(){
    return await mod.article.findAll();
}

async function get_articles_by_category(code){
    return await mod.article.find({category_code : code});

}
async function set_article(article) {
  
   let Narticle = new Object ({
        id : article.id,
        title : article.title,
        main_text : article.main_text,
        author_id: article.author_id,
        outstanding : article.outstanding,
      

    });
   mod.article.create(Narticle).then(function(article) {
      console.log("SUCCESFULLY", article);
   }).catch(function(error){
       console.log("ERROR",error);
   });

}
async function remove_article(id){
    return await mod.article.destroy({where :{id : id}});
}
async function get_article_by_id(id){
    return await mod.article.findByPk(id);
}
async function search_by_term(term){
    const Op = Sequelize.Op;
    return await mod.article.findAll({where :{
        title : {
        [Op.like]: '%' + term + '%'/*'%`${term}%`'*/ 
        }
    }});
}
async function get_articles_by_author(authorID){
    return await mod.article.findAll({where :{
        author_id : authorID 
    }});
}
module.exports = {
    get_articles_by_author,
    search_by_term,
    get_articles_by_category,
    get_articles,
    set_article,
    remove_article,
    get_article_by_id,
    update_article
}


