module.exports =(sequelize,dataTypes) => {
    let category = sequelize.define('category',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    name: {type :dataTypes.STRING , required:true , unique:true},
    code: {type :dataTypes.INTEGER , required:true , unique:true}  
   })
  category.associate = function(models){
    models.category.belongsToMany(models.article,{through : 'article_category'});
 }   
 

  
return category;
}

