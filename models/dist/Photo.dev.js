"use strict";

module.exports = function (sequelize, dataTypes) {
  var photo = sequelize.define('photo', {
    id: {
      type: dataTypes.STRING,
      primaryKey: true
    },
    fieldname: {
      type: dataTypes.STRING,
      defaultValue: "field"
    },
    originalname: {
      type: dataTypes.STRING,
      defaultValue: "default-pshe-square"
    },
    mimetype: {
      type: dataTypes.STRING,
      defaultValue: "image/png"
    },
    destination: {
      type: dataTypes.STRING,
      defaultValue: "/public/images/"
    },
    filename: {
      type: dataTypes.STRING,
      defaultValue: "default-pshe-square"
    },
    path: {
      type: dataTypes.STRING,
      defaultValue: "/public/images/default-pshe-square"
    },
    size: {
      type: dataTypes.INTEGER,
      defaultValue: 0
    },
    photo_author: {
      type: dataTypes.STRING,
      defaultValue: "archive.org"
    },
    articleId: {
      type: dataTypes.STRING,
      required: true
    }
  });
  return photo;
};