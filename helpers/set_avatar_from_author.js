var pictureController = require('../controllers/Picture');
async function set_avatar (picture, id){
    return await pictureController.set_picture(picture,id);
}
module.exports={
    set_avatar
}