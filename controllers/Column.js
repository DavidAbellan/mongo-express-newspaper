var modColumn = require('../models/Opinion_Columns');

async function set_column(column){
    let col = await new modColumn ({
        main_text : column.main_text,
        highlights : column.highlights,
        title : column.title,
        author : column.author
    }).save();
}

async function get_columns() {
    return await modColumn.find();
}

module.exports = {
    set_column,
    get_columns
}
