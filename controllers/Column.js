var modColumn = require('../models');
var addColumn = require('../helpers/add_column_to_author');

async function set_column(column){
    let col = new column ({
        main_text : column.main_text,
        highlights : column.highlights,
        title : column.title,
        author : column.author,
        upload_at: Date.now()
    })
    await modColumn.opinion_column.create(new column);
    await addColumn.set_new_column(col.author,col._id)

}

async function get_columns() {
    return await modColumn.opinion_column.findAll();
}
async function get_column_by_author(authorID) {
    return await modColumn.opinion_column.findByPk({author:authorID});

}

async function remove_column(id){
    return await modColumn.opinion_column.findByPk(id).destroy();
}

async function get_column_by_id(id){
    return await modColumn.opinion_column.findByPk(id);
}
async function update_column(id,column){
    await modColumn.opinion_column.update({_id : id}, 
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
