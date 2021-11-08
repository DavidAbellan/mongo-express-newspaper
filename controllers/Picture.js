var mod = require('../models');
var idgen = require('../helpers/id_generator');

async function set_picture(picture,authorID){
    picture.author_id = authorID;
    picture.id = idgen.get_random_id();
    return await mod.picture.create(picture);

}
async function get_picture(id){
    return await mod.picture.findOne({where : {author_id : id}});
}

module.exports={
    set_picture,
    get_picture
}