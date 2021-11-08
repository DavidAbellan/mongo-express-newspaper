"use strict";

var express = require('express');

var router = express.Router();

var article_control = require('../controllers/Article');

var column_control = require('../controllers/Column');

var categoryControl = require('../controllers/Category');

var authorController = require('../controllers/Author');

var formatArt = require('../helpers/format_article');

var formatCol = require('../helpers/format_column');

var formatHour = require('../helpers/format_hour');

var getAllFromCtgry = require('../helpers/get_all_from_category');

var getRelArt = require('../helpers/get_related_articles');

var moment = require('moment');

var pagination = require('../helpers/page');

var search_fun = require('../helpers/search_post');

var ls = require('local-storage');

var page;
var articles = [];
var nextPage = true;
var backPage = false;
/* GET home page. */

router.get('/', function _callee(req, res, next) {
  var total_pages, art, timer, columns, authors, categories, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!ls.get('page') || page === 0) {
            ls.set('page', 0);
            page = 0;
            backPage = false;
          } else {
            page = ls.get('page');
            backPage = true;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(pagination.total_pages());

        case 3:
          total_pages = _context.sent;
          total_pages = Math.ceil(total_pages);
          total_pages--;

          if (total_pages <= page + 1) {
            nextPage = false;
          } else {
            nextPage = true;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(pagination.page(page));

        case 9:
          art = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(formatArt.format(art));

        case 12:
          articles = _context.sent;
          timer = moment().format('MMMM Do YYYY, h:mm:ss a');
          _context.next = 16;
          return regeneratorRuntime.awrap(pagination.column(page));

        case 16:
          columns = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(formatCol.format(columns));

        case 19:
          columns = _context.sent;
          _context.next = 22;
          return regeneratorRuntime.awrap(authorController.get_authors());

        case 22:
          authors = _context.sent;
          _context.next = 25;
          return regeneratorRuntime.awrap(categoryControl.get_categories());

        case 25:
          categories = _context.sent;
          user = req.session.username;

          if (!user) {
            res.render('index', {
              timer: timer,
              articles: articles,
              columns: columns,
              categories: categories,
              authors: authors,
              nextPage: nextPage,
              backPage: backPage
            });
          } else {
            res.render('index', {
              timer: timer,
              articles: articles,
              columns: columns,
              user: user,
              categories: categories,
              authors: authors,
              nextPage: nextPage,
              backPage: backPage
            });
          }

        case 28:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/next', function (req, res, next) {
  var numberPage = ls.get('page');
  numberPage = +numberPage + 1;
  ls.set('page', numberPage);
  page = numberPage;
  res.redirect('/');
});
router.get('/back', function (req, res, next) {
  var numberPage = ls.get('page');
  +numberPage--;
  ls.set('page', numberPage);
  page = numberPage;
  res.redirect('/');
});
router.post('/search', function _callee2(req, res, next) {
  var lookin, posts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          lookin = req.body.lookin;
          _context2.next = 3;
          return regeneratorRuntime.awrap(search_fun.search(lookin));

        case 3:
          posts = _context2.sent;

          if (posts) {
            res.render('searchGrid', {
              posts: posts,
              lookin: lookin
            });
          } else {
            res.redirect('/');
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/hst/:code', function _callee3(req, res, next) {
  var code, categoryName, posts, category, author;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          code = req.params.code;

          if (!(code.toString().length < 4)) {
            _context3.next = 12;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(categoryControl.get_category_by_code(code));

        case 4:
          category = _context3.sent;
          categoryName = category[0].name;
          _context3.next = 8;
          return regeneratorRuntime.awrap(getAllFromCtgry.sendPosts(code));

        case 8:
          posts = _context3.sent;
          posts = formatArt.format(posts);
          _context3.next = 19;
          break;

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(column_control.get_column_by_author(code));

        case 14:
          posts = _context3.sent;
          _context3.next = 17;
          return regeneratorRuntime.awrap(authorController.get_author_by_id(code));

        case 17:
          author = _context3.sent;
          categoryName = author.name;

        case 19:
          res.render('searchGrid', {
            posts: posts,
            categoryName: categoryName
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/art/:id', function _callee4(req, res, next) {
  var article, author, time, category, posts;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(article_control.get_article_by_id(req.params.id));

        case 2:
          article = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(authorController.get_author_by_id(article.author_id));

        case 5:
          author = _context4.sent;
          time = formatHour.format(article.upload_at);
          _context4.next = 9;
          return regeneratorRuntime.awrap(categoryControl.get_category_by_code(article.category_code));

        case 9:
          category = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(getRelArt.get_related(article));

        case 12:
          posts = _context4.sent;
          res.render('artDetail', {
            category: category,
            article: article,
            author: author,
            time: time,
            posts: posts
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/col/:id', function _callee5(req, res, next) {
  var column, author;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(column_control.get_column_by_id(req.params.id));

        case 2:
          column = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(authorController.get_author_by_id(column.author));

        case 5:
          author = _context5.sent;
          res.render('colDetail', {
            author: author,
            column: column
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;