var modAuthor = require('../models');
var crypt = require('bcrypt');
var idgen = require('../helpers/id_generator');

async function get_authors() {
    return await modAuthor.author.findAll();
}
async function get_author_by_id(id) {
    return await modAuthor.author.findByPk(id);
}
async function set_author(name, username, password, root, description) {
    let crPassword = await crypt.hash(password, 3)
    let id = name[0] + idgen.get_random_id() + username[0];
    let author = new Object({
        id,
        name,
        username,
        password: crPassword,
        root,
        description
    })

    return await modAuthor.author.create(author);

}
async function get_id_by_username(username) {
    let user;
    user = await modAuthor.author.findOne({
        where: {
            username: username
        }
    });
    return user.id;
}
async function get_author(userc, password) {
    let user = await modAuthor.author.findOne({
        where: {
            username: userc
        }
    });
    if (!user) {
        return undefined;
    } else {

        let dsPassword = await crypt.compare(password, user.password);
        if (!dsPassword) {
            return undefined;
        }
        if (!password) {
            return undefined
        } else {
            return user;
        }
    }
}


async function update_author(id, author) {
    let crPassword = await crypt.hash(author.password, 3)
    if (author.avatar === undefined) {
        author.avatar = new Object({
            fieldname: 'field',
            originalname: 'default-profile.png',
            mimetype: 'image/png',
            destination: '/public/images',
            filename: 'default-profile.png',
            path: 'public/images/default-profile.png'
        })
    }
    let reqId = id;
    return await modAuthor.author.update({
        name: author.name,
        username: author.username,
        avatar: author.avatar,
        password: crPassword
    }, {
        where: {
            id: reqId
        }
    })
}


async function remove_author(id) {
    return await modAuthor.author.destroy({
        where: {
            id: id
        }
    });
}
module.exports = {
    update_author,
    get_author_by_id,
    remove_author,
    get_authors,
    set_author,
    get_author,
    get_id_by_username
}