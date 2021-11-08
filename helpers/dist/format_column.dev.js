"use strict";

var authController = require('../controllers/Author');

var pictureController = require('../controllers/Picture');

function format(columns) {
  var frColumns, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id_author, pic, photo, c;

  return regeneratorRuntime.async(function format$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          frColumns = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = columns[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 20;
            break;
          }

          col = _step.value;
          id_author = col.author_id;
          _context.next = 11;
          return regeneratorRuntime.awrap(authController.get_author_by_id(id_author));

        case 11:
          pic = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(pictureController.get_picture(pic.id));

        case 14:
          photo = _context.sent;
          c = {
            id: col.id,
            highlights: col.highlights,
            title: col.title,
            picture: photo
          };
          frColumns.push(c);

        case 17:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 20:
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 26:
          _context.prev = 26;
          _context.prev = 27;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 29:
          _context.prev = 29;

          if (!_didIteratorError) {
            _context.next = 32;
            break;
          }

          throw _iteratorError;

        case 32:
          return _context.finish(29);

        case 33:
          return _context.finish(26);

        case 34:
          return _context.abrupt("return", frColumns);

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 22, 26, 34], [27,, 29, 33]]);
}

module.exports = {
  format: format
};