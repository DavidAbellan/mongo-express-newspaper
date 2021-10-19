var modAuthor = require('../models');
var crypt = require('bcrypt');

async function get_authors(){
    return await modAuthor.author.findAll();
}
async function get_author_by_id(id){
    return await modAuthor.author.findByPk(id);
}
async function set_author(name,username,password,avatar,root){
    let crPassword = await crypt.hash(password,3)
    if(avatar === undefined) {
        avatar = new Object ({
            fieldname : 'field',
            originalname : 'default-profile.png',
            mimetype : 'image/png',
            destination : '/public/images',
            filename: 'default-profile.png',
            path :'public/images/default-profile.png'
        })
    };
    let author = await new author( {
        name,
        username ,
        avatar,
        password : crPassword,
        root
    })
    return await modAuthor.author.create(author);
}
async function get_author(userc, password){
    let user = await modAuthor.author.findOne( {username:userc});
    if (!user) {
        return undefined;
    } else{
        let dsPassword = await crypt.compare(password,user.password);
        if(!dsPassword){
            return undefined;
        }else {
            return user;
        } 

    }

}
async function update_author(id,author){
    let crPassword = await crypt.hash(author.password,3)
    if (author.avatar === undefined) {
        author.avatar = new Object({
            fieldname : 'field',
            originalname : 'default-profile.png',
            mimetype : 'image/png',
            destination : '/public/images',
            filename: 'default-profile.png',
            path :'public/images/default-profile.png'
        })
    }

    
    return await modAuthor.author.update({_id : id}, 
        {
            name : author.name,
            username : author.username,
            avatar : author.avatar,
            password: crPassword
         })
}
async function remove_author(id){
    return await modAuthor.author.findByPk(id).destroy();
}
module.exports = {
    update_author,
    get_author_by_id,
    remove_author,
    get_authors,
    set_author,
    get_author
}