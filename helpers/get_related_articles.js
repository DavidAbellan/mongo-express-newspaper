var colunmController = require('../controllers/Column');
var getPost = require('./search_post');
var getAllfromCat = require('./get_all_from_category');
async function get_related(article) {
 let posts = await colunmController.get_column_by_author(article.author_id);
 let categorySimilars = await getAllfromCat.sendPosts(article.category_code);
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
 related.map(art => posts.push(art));
 
 return posts;
 

}

module.exports = {
    get_related
}