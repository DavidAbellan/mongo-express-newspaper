var mod = require('../models');

async function set_picture(picture,authorID){
    picture.authorId = authorID;
    picture.id = String.fromCharCode(97 + Math.random() * 10) + Date.now();
    return await mod.picture.create(picture);

}

module.exports={
    set_picture
}