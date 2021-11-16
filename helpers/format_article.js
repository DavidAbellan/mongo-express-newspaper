var photoController = require("../controllers/Photo");
var authorController = require("../controllers/Author");
var addCategories = require("../helpers/add_categories_to_article");
async function format (articles){
    let article_f = [];
    for(article of articles){
        let author = await authorController.get_author_by_id(article.author_id);
        var fecha = new Date(article.updatedAt);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        fecha = fecha.toLocaleDateString("ES-es",options);
        let art = {
            title : article.title,
            id : article.id ,
            outstanding : article.outstanding,
            author : author.username,
            created :fecha
           
        }
        let categories = await addCategories.get_categories(art.id);
        art.categories = categories;
        console.log("ART __ FOMTA", art);
        let photo = await photoController.get_main_photo(art.id);
        art.photo = photo;
        article_f.push(art);

     } 
     article_f.reverse(); 

     return article_f.sort((a)=>{
    if(a.outstanding == true){
        return -1;
    } else {
        return 1;
    }
    return 0;
    }) 
    //devolver nombre categoria --- si se hace asíncrona no carga las noticias


}
module.exports = {
    format
}