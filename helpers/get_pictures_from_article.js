var photoController = require("../controllers/Photo");
async function get_photos(idarticle){
    return await photoController.return_photos(idarticle);
}
module.exports = {
    get_photos
}