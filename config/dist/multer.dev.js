"use strict";

var Multer = require('multer');

var idgen = require('../helpers/id_generator');

var storage = Multer.diskStorage({
  destination: function destination(req, file, callback) {
    if (!req.body.title) {
      callback(null, './public/images/profiles');
    } else {
      callback(null, './public/images');
    }

    ;
  },
  filename: function filename(req, file, callback) {
    callback(null, idgen.get_random_id() + file.originalname);
  }
});
var upload = Multer({
  storage: storage
});
module.exports = upload;