var authorController = require('../controllers/Author');
async function get_all_authors(){
    let authors= await authorController.get_authors();
    return authors;
}
module.exports = {
    get_all_authors
}