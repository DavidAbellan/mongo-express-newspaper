var authorController = require('../controllers/Author');

async function update_user(user,id) {
    return await authorController.update_author(id,user);
}

module.exports = {
    update_user
}