var mod = require('../models/Author');
var authorController = require('../controllers/Author');

async function set_new_column(idauthor,idcolumn){
   let author = await  authorController.get_author_by_id(idauthor);
   author.columns.push(idcolumn);
   await mod.update({_id : idauthor},{
     columns : author.columns}
     );
}
module.exports = {
    set_new_column
}
