var modColumn = require('../models');
var addColumn = require('../helpers/add_column_to_author');
var idgen = require('../helpers/id_generator');

async function set_column(column){
    let col = new Object ({
        id : idgen.get_random_id(),
        main_text : column.main_text,
        highlights : column.highlights,
        title : column.title,
        author_id : column.author_id,
        upload_at: Date.now()
    })
    console.log("column en controller", col);
    await modColumn.opinion_column.create(col);

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
