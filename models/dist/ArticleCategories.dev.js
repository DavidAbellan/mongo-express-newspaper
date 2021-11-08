"use strict";

module.exports = function (sequelize, dataTypes) {
  var ArticleCategory = sequelize.define('article_category', {
    id: {
      type: dataTypes.STRING,
      required: true,
      unique: true,
      primaryKey: true
    },
    articleId: {
      type: dataTypes.STRING,
      required: true
    },
    categoryId: {
      type: dataTypes.INTEGER,
      required: true
    }
  });
  return ArticleCategory;
};