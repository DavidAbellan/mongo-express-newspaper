var mod = require('../models');
var Photo = require('../models/Photo');
var idgen = require('../helpers/id_generator');

async function set_photo ( articleId) {
let photo = {
    id:idgen.get_random_id(),
    fieldname: "file",
    originalname:"default-pshe-square.png",
    mimetype: "image/png",
    destination:"./public/images/",
    filename:"default-pshe-square.png",
    path: "public\\images\\default-pshe-square.png",
    size :  0,
    photo_author :"archive.org",
    articleId ,
};    

return await mod.photo.create(photo);
}
async function set_photos (photoArray){
    return await mod.photo.bulkCreate(photoArray);     
}
async function get_main_photo (artId){
    let principal = await mod.photo.findOne({where : {articleId : artId}});
    return principal;
}
async function delete_photos_from_article(articleID){
    return await mod.photo.destroy({where : {articleId : articleID}});
}
async function return_photos (artId){
    return await mod.photo.findAll({where:{articleId : artId}});
}

module.exports = {
    return_photos,
    delete_photos_from_article,
    set_photo,
    get_main_photo,
    set_photos
}