var modColumn = require('../models');
var addColumn = require('../helpers/add_column_to_author');
var idgen = require('../helpers/id_generator');
var Sequelize = require('sequelize');


async function set_column(column){
    let col = new Object ({
        id : idgen.get_random_id(),
        main_text : column.main_text,
        highlights : column.highlights,
        title : column.title,
        author_id : column.author_id,
        upload_at: Date.now()
    })
    await modColumn.opinion_column.create(col);

}

async function get_columns() {
    return await modColumn.opinion_column.findAll();
}
async function get_column_by_author(authorID) {
    let id = authorID
    let columns = await modColumn.opinion_column.findAll({where :{author_id:id}});
    return columns

}

async function remove_column(id){
    return await modColumn.opinion_column.destroy({where : {id:id}});
}

async function get_column_by_id(id){
    return await modColumn.opinion_column.findByPk(id);
}
async function update_column(id,column){
    await modColumn.opinion_column.update({id : id}, 
        {
            title : column.title,
            highlights : column.highlights,
            main_text : column.main_text
         })
}
async function search_by_term(term){
    const Op = Sequelize.Op;
    return await modColumn.opinion_column.findAll({where :{
        title : {
        [Op.like]: '%' + term + '%'/*'%`${term}%`'*/ 
        }
    }});
}

module.exports = {
    search_by_term,
    get_column_by_author,
    update_column,
    set_column,
    get_columns,
    remove_column,
    get_column_by_id
}
