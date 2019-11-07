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
async function get_category_by_code(categorycode){
    let category = await modCategory.find({code : categorycode});
    return category;
}

module.exports = {
    get_categories,
    set_category,
    get_category_by_code

}