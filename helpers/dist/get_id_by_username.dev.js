"use strict";

var authCont = require('../controllers/Author');

function get_id(username) {
  return regeneratorRuntime.async(function get_id$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(authCont.get_id_by_username(username));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  get_id: get_id
};