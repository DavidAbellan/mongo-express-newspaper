var articleController = require('../controllers/Article');
var articleCategoryController = require('../controllers/ArticleCategory');
var getPhotos = require('../helpers/get_pictures_from_article');



async function getPosts(catId){
    var relationArray = await articleCategoryController.get_ArtCatData_from_CatId(catId);
    var articles = [];
    if (Array.isArray(relationArray)){
        for(let relation of relationArray){
            let article =  await articleController.get_article_by_id(relation.articleId);
            articles.push(article);
        }

    } else if(typeof relationArray ==='object' ){
        articles.push(relationArray);
    }
 


    return articles;

}

async function sendPosts(CategoryCode) {
    let articles = await articleController.get_articles_by_category(CategoryCode);
    return articles;
   
}
async function gimmeTwoToOf(idOfCategory){
    let articleCategoriesArrayObjects = await articleCategoryController.get_two_articles_from_category(idOfCategory);
    let twoOfThem = [];
    for(artCat of articleCategoriesArrayObjects){
        let p = await articleController.get_article_by_id(artCat.articleId)
        if (p != null){
          twoOfThem.push(p);
        }
    }
   
    return twoOfThem;

}
module.exports = {
    getPosts,
    sendPosts,
    gimmeTwoToOf
}