var authController = require('../controllers/Author');
var pictureController = require ('../controllers/Picture');

async function format(columns){
    let frColumns = [];
    for(col of columns){
        let id_author = col.author_id;
        let pic = await authController.get_author_by_id(id_author);
        let photo = await pictureController.get_picture(pic.id);
        let c = {
            id : col.id,
            highlights : col.highlights,
            title : col.title,
            picture : photo
        }
        frColumns.push(c);
    }
    return frColumns;

}
module.exports = {
    format
}