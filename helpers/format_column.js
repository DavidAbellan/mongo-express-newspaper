var authController = require('../controllers/Author');

async function format(columns){
    let frColumns = [];
    for(col of columns){
        let pic = await authController.get_author_by_id(col.author);
        let c = {
            id : col.id,
            highlights : col.highlights,
            title : col.title,
            picture : pic.avatar[0]

        }
        frColumns.push(c);
    }
    return frColumns;

}
module.exports = {
    format
}