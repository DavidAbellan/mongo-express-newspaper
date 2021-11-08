"use strict";

module.exports = function (sequelize, dataTypes) {
  var author = sequelize.define('author', {
    id: {
      type: dataTypes.STRING,
      required: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: dataTypes.STRING,
      required: true,
      unique: true
    },
    username: {
      type: dataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: dataTypes.STRING,
      trim: true
    }
  });
  return author;
};