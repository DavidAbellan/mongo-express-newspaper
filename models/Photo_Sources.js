
module.exports =(sequelize,dataTypes) => {
    let photo_source = sequelize.define('photo_source',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    url: {type :dataTypes.STRING , required:true, unique:true},
    photo_author :{type :dataTypes.STRING , defaultValue:"archive.org"}
    
    
   })
  
return photo_source;
}















