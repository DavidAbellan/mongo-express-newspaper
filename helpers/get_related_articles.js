var colunmController = require('../controllers/Column');
var getPost = require('./search_module');
var getAllfromCat = require('./get_all_from_category');
async function get_related(article) {
 let posts = [];
 let postsOfCategory = [];
 let categories = [];
 let authorPosts = await colunmController.get_column_by_author(article.author_id);
 for (cat of article.categories){
     categories.push(cat);
 }
 for (cat of categories){
     let p = await getAllfromCat.gimmeTwoToOf(cat[1]);
     if (p.length>0){
        postsOfCategory.push(p);
     }
 }
 if (postsOfCategory.length > 0){
     posts = postsOfCategory;
    }
    if (authorPosts.length > 0){
        for (post in authorPosts){
            posts.push(post);
        }
    }  

 let title = article.title.split(' ');
 let keywords = [];
 let related = [];
 for(word of title) {
     if (word.length > 3) {
         keywords.push(word);
     }
 }
 for(word of keywords) {
    let postRelated = await getPost.search(word) ;
    postRelated.map(art => {
         if(art.id != article.id){    
         related.push(art) }});
 }
 if (related.length > 0){ 
    related.map(art => posts.push(art));
 }
 posts.push(await getPost.getColums(article.author_id));

 return posts;
 

}

module.exports = {
    get_related
}