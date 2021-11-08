"use strict";

var mod = require('../models');

function update_article(id, article) {
  return regeneratorRuntime.async(function update_article$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mod.article.update({
            id: id
          }, {
            title: article.title,
            main_text: article.main_text,
            photo: article.photo,
            outstanding: article.outstanding
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function get_articles() {
  return regeneratorRuntime.async(function get_articles$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(mod.article.findAll());

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function get_articles_by_category(code) {
  return regeneratorRuntime.async(function get_articles_by_category$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(mod.article.find({
            category_code: code
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function set_article(article) {
  var newArticle;
  return regeneratorRuntime.async(function set_article$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          newArticle = new Object({
            id: article.id,
            title: article.title,
            main_text: article.main_text,
            author_id: article.author_id,
            outstanding: article.outstanding
          });
          mod.article.create(newArticle);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function remove_article(id) {
  return regeneratorRuntime.async(function remove_article$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(mod.article.findByPk(id).destroy());

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function get_article_by_id(id) {
  return regeneratorRuntime.async(function get_article_by_id$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(mod.article.findByPk(id));

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}

module.exports = {
  get_articles_by_category: get_articles_by_category,
  get_articles: get_articles,
  set_article: set_article,
  remove_article: remove_article,
  get_article_by_id: get_article_by_id,
  update_article: update_article
};