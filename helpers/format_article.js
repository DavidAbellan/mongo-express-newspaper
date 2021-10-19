
function format (articles){
    let article_f = [];
    for(article of articles){
        let art = {
            title : article.title,
            id : article._id ,
            outstanding : article.outstanding,
            photo :'/images/' + article.photo[0].filename,
        }
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