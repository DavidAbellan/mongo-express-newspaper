"use strict";

var mod = require('../models');

var idgen = require('../helpers/id_generator');

function set_photo(photo, articleId) {
  return regeneratorRuntime.async(function set_photo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          photo.articleId = articleId;
          photo.id = idgen.get_random_id();
          _context.next = 4;
          return regeneratorRuntime.awrap(mod.photo.create(photo));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function set_photos(photoArray) {
  return regeneratorRuntime.async(function set_photos$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(mod.photo.bulkCreate(photoArray));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function get_main_photo(artId) {
  var principal;
  return regeneratorRuntime.async(function get_main_photo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(mod.photo.findOne({
            where: {
              articleId: artId
            }
          }));

        case 2:
          principal = _context3.sent;
          console.log('photo', principal);
          return _context3.abrupt("return", principal);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  set_photo: set_photo,
  get_main_photo: get_main_photo,
  set_photos: set_photos
};