module.exports =(sequelize,dataTypes) => {
    let category = sequelize.define('category',{
    name: {type :dataTypes.STRING , required:true , unique:true},
    code: {type :dataTypes.INTEGER , required:true , unique:true}  
   })
  
return category;
}

