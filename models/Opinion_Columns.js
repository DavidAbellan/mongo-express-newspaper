module.exports =(sequelize,dataTypes) => {
    let opinion = sequelize.define('opinion_column',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    main_text : {type :dataTypes.STRING , required:true},
    highlights: dataTypes.STRING ,
    title :{type :dataTypes.STRING , required:true},
    upload_at : dataTypes.DATE,
   
   })
opinion.associate = function(models){
    models.opinion_column.belongsTo(models.author, {as:"author"});
    models.opinion_column.hasMany(models.comment);
    
}   
  
return opinion;
}
