var photoController = require("../controllers/Photo");
var authorController = require("../controllers/Author");
var addCategories = require("../helpers/add_categories_to_article");
async function format (articles){
    let article_f = [];
    for(article of articles){
        let author = await authorController.get_author_by_id(article.author_id);
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var fecha = new Date(article.updatedAt);
        fecha = String(dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear());
        let art = {
            title : article.title,
            id : article.id ,
            outstanding : article.outstanding,
            author : author.username,
            created :fecha
           
        }
        let categories = await addCategories.get_categories(art.id);
        art.categories = categories;
        let photo = await photoController.get_main_photo(art.id);
        art.photo = photo;
        article_f.push(art);


     } 
     article_f.reverse(); 

     
     article_f.sort((a,b)=> a.created<b.created )
     
     article_f.sort((a)=>{
         if(a.outstanding == true){
             return -1;
            } else {
                return 1;
            }
            return 0;
        }) 
    return article_f;



}
module.exports = {
    format
}