module.exports =(sequelize,dataTypes) => {
    let comment = sequelize.define('comment',{
    comment: {type :dataTypes.STRING , required:true},
    post_id: {type :dataTypes.STRING , required:true},  
    author:  {type :dataTypes.STRING, required:true}
   
   })
comment.associate = function(models) {
    models.comment.belongsTo(models.article);
    models.comment.belongsTo(models.opinion_column);
}   
  
return comment;
}















