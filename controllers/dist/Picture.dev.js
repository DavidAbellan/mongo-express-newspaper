"use strict";

var mod = require('../models');

var idgen = require('../helpers/id_generator');

function set_picture(picture, authorID) {
  return regeneratorRuntime.async(function set_picture$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          picture.authorId = authorID;
          picture.id = idgen.get_random_id();
          _context.next = 4;
          return regeneratorRuntime.awrap(mod.picture.create(picture));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  set_picture: set_picture
};