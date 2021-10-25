
module.exports =(sequelize,dataTypes) => {
    let photo = sequelize.define('photo',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    fieldname: {type :dataTypes.STRING , defaultValue:"field"},
    originalname: {type :dataTypes.STRING , defaultValue:"default-pshe-square"},
    mimetype: {type :dataTypes.STRING , defaultValue:"image/png"},
    destination: {type :dataTypes.STRING , defaultValue:"/public/images/"},
    filename: {type :dataTypes.STRING , defaultValue:"default-pshe-square"},
    path: {type :dataTypes.STRING , defaultValue:"/public/images/default-pshe-square"},
    photo_author :{type :dataTypes.STRING , defaultValue:"archive.org"}
    
    
   })
   photo.associate = function(models){
       models.photo.belongsTo(models.article);
    
   }
  
return photo; 
}















