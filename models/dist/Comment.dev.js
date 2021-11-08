"use strict";

module.exports = function (sequelize, dataTypes) {
  var comment = sequelize.define('comment', {
    comment: {
      type: dataTypes.STRING,
      required: true
    },
    post_id: {
      type: dataTypes.STRING,
      required: true
    },
    author: {
      type: dataTypes.STRING,
      required: true
    }
  });
  return comment;
};