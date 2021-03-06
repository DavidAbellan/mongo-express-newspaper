var modColumn = require('../models/Opinion_Columns');
var addColumn = require('../helpers/add_column_to_author');

async function set_column(column){
    let col = await new modColumn ({
        main_text : column.main_text,
        highlights : column.highlights,
        title : column.title,
        author : column.author,
        upload_at: Date.now()
    }).save();
    await addColumn.set_new_column(col.author,col._id)

}

async function get_columns() {
    return await modColumn.find();
}
async function get_column_by_author(authorID) {
    return await modColumn.find({author:authorID});

}

async function remove_column(id){
    return await modColumn.findByIdAndDelete(id);
}

async function get_column_by_id(id){
    return await modColumn.findById(id);
}
async function update_column(id,column){
    await modColumn.update({_id : id}, 
        {
            title : column.title,
            highlights : column.highlights,
            main_text : column.main_text
         })
}

module.exports = {
    get_column_by_author,
    update_column,
    set_column,
    get_columns,
    remove_column,
    get_column_by_id
}
