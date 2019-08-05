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
async function get_category_by_code(code){
    let categories = await modCategory.find();
    for (cat of categories){
        if (cat.code === code){
            
            return cat;
        }
    }
    return undefined;
}

module.exports = {
    get_categories,
    set_category,
    get_category_by_code

}