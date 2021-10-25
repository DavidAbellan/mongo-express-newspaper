module.exports =(sequelize,dataTypes) => {
    let article = sequelize.define('article',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},    
    title: {type :dataTypes.STRING , required:true},
    main_text: {type :dataTypes.STRING , required:true},
    upload_at : dataTypes.DATE,
    outstanding : {type :dataTypes.BOOLEAN, defaultValue : false }
    });

article.associate = function(models){
    models.article.belongsToMany(models.category, {through : 'article_category'});
    models.article.hasMany(models.photo);
    models.article.hasMany(models.comment);
    models.article.belongsTo(models.author);
}     


  
return article;
}














