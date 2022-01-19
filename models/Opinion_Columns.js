module.exports =(sequelize,dataTypes) => {
    let opinion = sequelize.define('opinion_column',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    main_text : {type :dataTypes.TEXT('long') , required:true},
    highlights: dataTypes.STRING ,
    title :{type :dataTypes.STRING , required:true},
    author_id : {type: dataTypes.STRING, required:true}

   
   })

  
return opinion;
}
