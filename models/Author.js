module.exports =(sequelize,dataTypes) => {
    let author = sequelize.define('author',{
    name: {type :dataTypes.STRING , required:true , unique:true},
    username: {type :dataTypes.STRING , required:true , unique:true},
    password : {type :dataTypes.STRING, trim : true }   
   })
author.associate = function(models){
    models.author.hasMany(models.article);
    models.author.hasMany(models.opinion_column);
    models.author.hasOne(models.picture);
}   
  
return author;
}
