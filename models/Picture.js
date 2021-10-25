module.exports =(sequelize,dataTypes) => {
    let picture = sequelize.define('picture',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    fieldname: {type :dataTypes.STRING , defaultValue:"field"},
    originalname: {type :dataTypes.STRING , defaultValue:"default-profile"},
    mimetype: {type :dataTypes.STRING , defaultValue:"image/png"},
    destination: {type :dataTypes.STRING , defaultValue:"/public/images/profiles/"},
    filename: {type :dataTypes.STRING , defaultValue:"default-profile"},
    path: {type :dataTypes.STRING , defaultValue:"/public/images/profiles/default-profile"},
    
    
   })
   picture.associate = function(models){
       models.picture.belongsTo(models.author);
    
   }
  
return picture; 
}




