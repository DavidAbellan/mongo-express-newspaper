var modCategory = require('../models/Category');

async function get_categories(){
    return await modCategory.find();
}

async function set_category(name, code){
    let category = await new modCategory ({
        name ,
        code
    }).save()
}

module.exports = {
    get_categories,
    set_category

}