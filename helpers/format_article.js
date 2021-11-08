var photoController = require("../controllers/Photo");
async function format (articles){
    let article_f = [];
    for(article of articles){
        let art = {
            title : article.title,
            id : article.id ,
            outstanding : article.outstanding,
           
        }
        let photo = await photoController.get_main_photo(art.id);
        art.photo = (photo.destination +"/"+ photo.filename).slice(2);
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