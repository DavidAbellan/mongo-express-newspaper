module.exports =(sequelize,dataTypes) => {
    let ArticleCategory = sequelize.define('article_category',{
    id: {type :dataTypes.STRING , required:true,unique:true, primaryKey:true},
    articleId: {type :dataTypes.STRING , required:true },
    categoryId: {type :dataTypes.STRING , required:true}  
   });
 
 

  
return ArticleCategory;
}