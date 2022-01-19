module.exports =(sequelize,dataTypes) => {
    let author = sequelize.define('author',{
    id: {type :dataTypes.STRING , required:true,primaryKey:true},        
    name: {type :dataTypes.STRING , required:true , unique:true},
    username: {type :dataTypes.STRING , required:true , unique:true},
    password : {type :dataTypes.STRING, trim : true }   ,
    description : {type :dataTypes.TEXT('long') , required:true}
   })

  
return author;
}
