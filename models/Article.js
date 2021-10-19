module.exports =(sequelize,dataTypes) => {
    let article = sequelize.define('article',{
    title: {type :dataTypes.STRING , required:true},
    main_text: {type :dataTypes.STRING , required:true},
    photo : dataTypes.JSON,
    upload_at : dataTypes.DATE,
    author_id: dataTypes.STRING,
    outstanding : {type :dataTypes.BOOLEAN, defaultValue : false },
    category_code : dataTypes.INTEGER
    
   })
  
return article;
}














