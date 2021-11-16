var mod = require('../models');
var idgen = require('../helpers/id_generator');
var catController = require('../controllers/Category');


async function get_categories_from_article(articleId) {
   let id = articleId;  
   let artRelation = await mod.article_category.findAll({where :
     {articleId : id}});
   //ArtRelation es un array con un registro con objeto de objetos
   let categories = [];
       
    for(let i = 0; i < artRelation.length; i ++) {
        let cat = await catController.get_category_by_code(artRelation[i].categoryId);
        if (cat.name != undefined) {

            categories.push(cat.name);
        }else {
            categories.push("Sin Categoría");
        }
   }
   return categories;
};

async function set_relationship_article_category(idcategory, idarticle){
var id = idgen.get_random_id();
var relation = new Object ({
    id ,
    articleId : idarticle,
    categoryId : idcategory
    
});
await mod.article_category.create(relation);
}
module.exports = {
    set_relationship_article_category,
    get_categories_from_article
}