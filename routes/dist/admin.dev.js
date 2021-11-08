"use strict";

var express = require('express');

var router = express.Router();

var adminControl = require('../controllers/Author');

var validator = require('validator');

var upload = require('../config/multer');

var categoryControl = require('../controllers/Category');

var articleCategoryControl = require('../controllers/ArticleCategory');

var articleControl = require('../controllers/Article');

var photoControl = require('../controllers/Photo');

var columnControl = require('../controllers/Column');

var helpHighLight = require('../helpers/set_highlight');

var getAuthorId = require('../helpers/get_id_by_username');

var isLogged = require('../middleware/isLogged');

var token = require('../services/token');

var LS = require('local-storage');

var idgen = require('../helpers/id_generator');

router.post('/', function _callee(req, res, next) {
  var categories, username, password, user, tokenService, jwt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(categoryControl.get_categories());

        case 2:
          categories = _context.sent;
          username = req.body.username;
          password = req.body.password;
          /*if (!validator.isAscii(username)){
              /*res.redirect('/');
             }else {*/

          _context.next = 7;
          return regeneratorRuntime.awrap(adminControl.get_author(username, password));

        case 7:
          user = _context.sent;

          if (!user) {
            res.render('admin', {
              categories: categories
            });
          } else {
            req.session.username = user.username;
            req.session.id_author = user._id;
            req.session.root = user.root;
            tokenService = new token();
            jwt = tokenService.generateToken(user);
            console.log(jwt);
            LS.set('token', jwt);
            res.redirect('/');
            /*}*/
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/', function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render('admin');

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/new', isLogged, function _callee3(req, res, next) {
  var categories;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(categoryControl.get_categories());

        case 2:
          categories = _context3.sent;
          res.render('insertNew', {
            categories: categories
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/new', isLogged, upload.array('file', 3), function _callee4(req, res, next) {
  var pictures, art, authId, artID, post, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          art = false;
          _context4.next = 3;
          return regeneratorRuntime.awrap(getAuthorId.get_id(req.session.username));

        case 3:
          authId = _context4.sent;
          artID = idgen.get_random_id();
          console.log("body", req.body);

          if (req.body.oustanding === "on") {
            art = true;
          }

          post = new Object({
            id: artID,
            title: req.body.title,
            main_text: req.body.main_text,
            author_id: authId,
            outstanding: art
          });

          if (!(req.files.length !== 0 && req.files != undefined)) {
            _context4.next = 31;
            break;
          }

          pictures = req.files;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 13;

          for (_iterator = pictures[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            picture = _step.value;
            picture.id = idgen.get_random_id();
            picture.articleId = artID;
          }

          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](13);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 21:
          _context4.prev = 21;
          _context4.prev = 22;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 24:
          _context4.prev = 24;

          if (!_didIteratorError) {
            _context4.next = 27;
            break;
          }

          throw _iteratorError;

        case 27:
          return _context4.finish(24);

        case 28:
          return _context4.finish(21);

        case 29:
          _context4.next = 31;
          return regeneratorRuntime.awrap(photoControl.set_photos(pictures));

        case 31:
          console.log('post ', post);
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 35;
          _iterator2 = req.body.categories[Symbol.iterator]();

        case 37:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 44;
            break;
          }

          cat = _step2.value;
          _context4.next = 41;
          return regeneratorRuntime.awrap(articleCategoryControl.set_relationship_article_category(cat, artID));

        case 41:
          _iteratorNormalCompletion2 = true;
          _context4.next = 37;
          break;

        case 44:
          _context4.next = 50;
          break;

        case 46:
          _context4.prev = 46;
          _context4.t1 = _context4["catch"](35);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t1;

        case 50:
          _context4.prev = 50;
          _context4.prev = 51;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 53:
          _context4.prev = 53;

          if (!_didIteratorError2) {
            _context4.next = 56;
            break;
          }

          throw _iteratorError2;

        case 56:
          return _context4.finish(53);

        case 57:
          return _context4.finish(50);

        case 58:
          post.id = artID;
          _context4.next = 61;
          return regeneratorRuntime.awrap(articleControl.set_article(post));

        case 61:
          res.redirect('/');

        case 62:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[13, 17, 21, 29], [22,, 24, 28], [35, 46, 50, 58], [51,, 53, 57]]);
});
router.get('/column', isLogged, function (req, res) {
  res.render('column');
});
router.post('/column', isLogged, function _callee5(req, res) {
  var highlights, col;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          highlights = "";

          if (req.body.highlights === '') {
            highlights = helpHighLight.find_highlight(req.body.main_text);
          } else {
            highlights = req.body.highlights;
          }

          col = new Object({
            main_text: req.body.main_text,
            highlights: highlights,
            title: req.body.title,
            author: req.session.id_author,
            upload_at: Date.now()
          });
          _context5.next = 5;
          return regeneratorRuntime.awrap(columnControl.set_column(col));

        case 5:
          res.redirect('/');

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.get('/modify', isLogged, function _callee6(req, res) {
  var articles, columns;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(articleControl.get_articles());

        case 2:
          articles = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(columnControl.get_columns());

        case 5:
          columns = _context6.sent;
          res.render('modify', {
            articles: articles,
            columns: columns
          });

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.post('/modify', isLogged, function _callee7(req, res) {
  var column, categories, article;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!(req.body.article === undefined)) {
            _context7.next = 17;
            break;
          }

          if (!(req.body.column === undefined)) {
            _context7.next = 5;
            break;
          }

          res.redirect('/');
          _context7.next = 15;
          break;

        case 5:
          if (!(req.body.update === undefined)) {
            _context7.next = 11;
            break;
          }

          _context7.next = 8;
          return regeneratorRuntime.awrap(columnControl.remove_column(req.body.column));

        case 8:
          res.redirect('/');
          _context7.next = 15;
          break;

        case 11:
          _context7.next = 13;
          return regeneratorRuntime.awrap(columnControl.get_column_by_id(req.body.column));

        case 13:
          column = _context7.sent;
          res.render('modColumn', {
            column: column
          });

        case 15:
          _context7.next = 30;
          break;

        case 17:
          if (!(req.body.update === undefined)) {
            _context7.next = 23;
            break;
          }

          _context7.next = 20;
          return regeneratorRuntime.awrap(articleControl.remove_article(req.body.article));

        case 20:
          res.redirect('/');
          _context7.next = 30;
          break;

        case 23:
          _context7.next = 25;
          return regeneratorRuntime.awrap(categoryControl.get_categories());

        case 25:
          categories = _context7.sent;
          _context7.next = 28;
          return regeneratorRuntime.awrap(articleControl.get_article_by_id(req.body.article));

        case 28:
          article = _context7.sent;
          res.render('modArticle', {
            categories: categories,
            article: article
          });

        case 30:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.post('/modify/col/:id', isLogged, function _callee8(req, res) {
  var column;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!(validator.isAlpha(req.body.main_text) && validator.isAlpha(req.body.title))) {
            _context8.next = 4;
            break;
          }

          column = new Object({
            main_text: req.body.main_text,
            title: req.body.title,
            highlights: req.body.highlights
          });
          _context8.next = 4;
          return regeneratorRuntime.awrap(columnControl.update_column(req.params.id, column));

        case 4:
          ;
          res.redirect('/');

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router.post('/modify/art/:id', isLogged, upload.array('file', 3), function _callee9(req, res) {
  var art, pictures, post;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          //if (validator.isAlpha(req.body.title) && validator.isAlpha(req.body.main_text) &&
          //validator.isInt(req.body.category) && req.files) {
          if (req.body.oustanding === "on") {
            art = true;
          } else {
            art = false;
          }

          if (req.files.length === 0) {
            pictures = new Object({
              fieldname: 'field',
              originalname: 'default-pshe-square.png',
              mimetype: 'image/png',
              destination: '/public/images',
              filename: 'default-pshe-square.png',
              path: 'public/images/default-pshe-square.png'
            });
          } else {
            pictures = req.files;
          }

          post = new Object({
            title: req.body.title,
            main_text: req.body.main_text,
            photo: pictures,
            author_id: req.session.id_author,
            outstanding: art,
            category_code: req.body.category
          });
          _context9.next = 5;
          return regeneratorRuntime.awrap(articleControl.update_article(req.params.id, post));

        case 5:
          res.redirect('/');

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
});
module.exports = router;