"use strict";

var photoController = require("../controllers/Photo");

function format(articles) {
  var article_f, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, art, photo;

  return regeneratorRuntime.async(function format$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          article_f = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = articles[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 18;
            break;
          }

          article = _step.value;
          art = {
            title: article.title,
            id: article.id,
            outstanding: article.outstanding
          };
          _context.next = 11;
          return regeneratorRuntime.awrap(photoController.get_main_photo(art.id));

        case 11:
          photo = _context.sent;
          art.photo = (photo.destination + "/" + photo.filename).slice(2);
          console.log(photo);
          article_f.push(art);

        case 15:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 24:
          _context.prev = 24;
          _context.prev = 25;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 27:
          _context.prev = 27;

          if (!_didIteratorError) {
            _context.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context.finish(27);

        case 31:
          return _context.finish(24);

        case 32:
          article_f.reverse();
          return _context.abrupt("return", article_f.sort(function (a) {
            if (a.outstanding == true) {
              return -1;
            } else {
              return 1;
            }

            return 0;
          }));

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 20, 24, 32], [25,, 27, 31]]);
}

module.exports = {
  format: format
};