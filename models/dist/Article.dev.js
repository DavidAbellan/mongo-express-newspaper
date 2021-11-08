"use strict";

module.exports = function (sequelize, dataTypes) {
  var article = sequelize.define('article', {
    id: {
      type: dataTypes.STRING,
      required: true,
      unique: true,
      primaryKey: true
    },
    title: {
      type: dataTypes.STRING,
      required: true
    },
    main_text: {
      type: dataTypes.STRING,
      required: true
    },
    outstanding: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    },
    author_id: {
      type: dataTypes.STRING,
      required: true,
      unique: true
    }
  });
  return article;
};