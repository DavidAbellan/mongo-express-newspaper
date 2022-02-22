var authorController = require('../controllers/Author');
async function get_all_authors(){
    return await authorController.get_authors()
}
module.exports = {
    get_all_authors
}