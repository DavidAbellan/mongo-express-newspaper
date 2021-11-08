var mod = require('../models');
var idgen = require('../helpers/id_generator');

async function set_photo (photo, articleId) {
photo.articleId = articleId;
photo.id = idgen.get_random_id();
return await mod.photo.create(photo);
}
async function set_photos (photoArray){
    return await mod.photo.bulkCreate(photoArray);     
}
async function get_main_photo (artId){
    let principal = await mod.photo.findOne({where : {articleId : artId}});
    return principal;
}

module.exports = {
    set_photo,
    get_main_photo,
    set_photos
}