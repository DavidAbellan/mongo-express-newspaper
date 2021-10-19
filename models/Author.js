module.exports =(sequelize,dataTypes) => {
    let author = sequelize.define('author',{
    name: {type :dataTypes.STRING , required:true , unique:true},
    username: {type :dataTypes.STRING , required:true , unique:true},
    password : {type :dataTypes.STRING, trim : true },
    avatar : dataTypes.STRING,
    columns : dataTypes.STRING,
   
   })
  
return author;
}
