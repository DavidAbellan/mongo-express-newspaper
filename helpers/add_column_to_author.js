var mod = require('../models');
var authorController = require('../controllers/Author');

async function set_new_column(idauthor,idcolumn){
   let author = await  authorController.get_author_by_id(idauthor);
   author.columns=author.columns + "," +idcolumn;
   await mod.opinion_column.update({_id : idauthor},{
     columns : author.columns}
     );
}
module.exports = {
    set_new_column
}
