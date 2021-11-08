var mod = require('../models');
var idgen = require('../helpers/id_generator');

async function set_relationship_article_category(idcategory, idarticle){
var id = idgen.get_random_id();    
var relation = new Object ({
    id ,
    articleId : idarticle,
    categoryId : idcategory
    
});
return await mod.article_category.create(relation);
}
module.exports = {
    set_relationship_article_category
}