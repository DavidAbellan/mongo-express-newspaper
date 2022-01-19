var columnController = require("../controllers/Column");
async function remove_column (id){
    await columnController.remove_column(id);
     
   
    return;
}
module.exports = {
    remove_column
}