module.exports =(sequelize,dataTypes) => {
    let article = sequelize.define('article',{
    title: {type :dataTypes.STRING , required:true},
    main_text: {type :dataTypes.STRING , required:true},
    photo : dataTypes.JSON,
    upload_at : dataTypes.DATE,
    author_id: dataTypes.STRING,
    outstanding : {type :dataTypes.BOOLEAN, defaultValue : false },
   
    
   });

   article.associate = function(models){
    models.article.hasMany(models.category, {as:"categories"});
}     


  
return article;
}














