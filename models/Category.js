module.exports =(sequelize,dataTypes) => {
    let category = sequelize.define('category',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    name: {type :dataTypes.STRING , required:true , unique:true},
    code: {type :dataTypes.INTEGER , required:true , unique:true}  
   })
  

  
return category;
}
