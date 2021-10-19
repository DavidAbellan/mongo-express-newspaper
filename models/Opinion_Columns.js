module.exports =(sequelize,dataTypes) => {
    let opinion = sequelize.define('opinion_column',{
    main_text : {type :dataTypes.STRING , required:true},
    highlights: dataTypes.STRING ,
    title :{type :dataTypes.STRING , required:true},
    author : {type :dataTypes.STRING , required:true},
    upload_at : dataTypes.DATE,
   
   })
  
return opinion;
}
