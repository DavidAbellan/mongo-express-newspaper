var mod = require('../models');
var idgen = require('../helpers/id_generator');
var catController = require('../controllers/Category');

async function get_two_articles_from_category(categoryId){
    let id = categoryId;
    let catRelation = await mod.article_category.findAll({
        where : {
            categoryId : id
        }, 
        limit: 2,
        order : [['updatedAt', 'DESC']]
    })
    
    return catRelation;
}
async function get_ArtCatData_from_CatId(catid){
    let artCatData =  await mod.article_category.findAll({
        where: {
            categoryId: catid
        }
    }); 
    return artCatData;
}

async function get_categories_from_article(articleId) {
    let id = articleId;
    let artRelation = await mod.article_category.findAll({
        where: {
            articleId: id
        }
    });
    let categories = [];

    for (let i = 0; i < artRelation.length; i++) {
        let cat = await catController.get_category_by_code(artRelation[i].categoryId);
        if (cat.name != undefined) {

            categories.push([cat.name, cat.id]);
        } else {
            categories.push("Sin Categoría");
        }
    }
    return categories;
};

async function set_relationship_article_category(idcategory, idarticle) {
    var id = idgen.get_random_id();
    var relation = new Object({
        id,
        articleId: idarticle,
        categoryId: idcategory

    });
    await mod.article_category.create(relation);
}
async function delete_relationship_article(idArticle) {
    return await mod.article_category.destroy({
        where: {
            articleId: idArticle
        }
    });
}
module.exports = {
    get_ArtCatData_from_CatId,
    delete_relationship_article,
    set_relationship_article_category,
    get_categories_from_article,
    get_two_articles_from_category
}