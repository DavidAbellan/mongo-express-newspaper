var photoController = require('../controllers/Photo');
var idgen = require('../helpers/id_generator');
async function update_photos(idArticle, pictures){
    await photoController.delete_photos_from_article(idArticle);
    for (picture of pictures){
        picture.id = idgen.get_random_id();
        picture.articleId = artID;
    }
    await photoController.set_photos(pictures);
    return;

};
module.exports = {
    update_photos
}