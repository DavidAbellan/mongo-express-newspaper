
module.exports =(sequelize,dataTypes) => {
    let subscriptor = sequelize.define('subscriptor',{
    email: {type :dataTypes.STRING , required:true,unique:true}
    
    
   })
  
return subscriptor;
}















