var modColumn = require('../models/Opinion_Columns');

async function set_column(column){
    let col = await new modColumn ({
        main_text : column.main_text,
        highlights : column.highlights,
        title : column.title,
        author : column.author,
        upload_at: Date.now()
    }).save();
}

async function get_columns() {
    return await modColumn.find();
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
    update_column,
    set_column,
    get_columns,
    remove_column,
    get_column_by_id
}
