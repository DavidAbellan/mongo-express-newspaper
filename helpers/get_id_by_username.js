var authCont = require('../controllers/Author');
async function get_id (username) {
  return await authCont.get_id_by_username(username);
}
module.exports={
    get_id
}