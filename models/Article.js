module.exports =(sequelize,dataTypes) => {
    let article = sequelize.define('article',{
    id: {type :dataTypes.STRING , required:true,primaryKey:true},    
    title: {type :dataTypes.STRING , required:true},
    main_text: {type :dataTypes.TEXT('long') , required:true},
    outstanding : {type :dataTypes.BOOLEAN, defaultValue : false },
    author_id : {type: dataTypes.STRING, required:true},
   
    });

  
return article;
}














