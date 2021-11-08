var categoryControl = require('../controllers/Category');

async function match (name){
    let categories = await categoryControl.get_categories();
    for(cat of categories){
        if (cat.name === name){
            console.log(cat.name);
          return true
        }
    }
    return false;
}
module.exports= {
    match
}