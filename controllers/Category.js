var modCategory = require('../models');

async function get_categories(){
    return await modCategory.category.findAll();
}

async function set_category(name, code){
    let category = await new category ({
        name ,
        code
    })
    await modCategory.category.save(category)
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