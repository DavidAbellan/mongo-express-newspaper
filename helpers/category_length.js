var catControl = require('../controllers/Category');
async function large () {
 let cats = await catControl.get_categories()
 return cats.length;
}
module.exports = {
    large
}