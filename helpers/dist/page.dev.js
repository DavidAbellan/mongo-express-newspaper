"use strict";

var modArticle = require('../models');

var modColumn = require('../models');

var contrArticle = require('../controllers/Article');

var contrColumn = require('../controllers/Column');

function page(pageNumber) {
  var pageSize, offset, limit, articles;
  return regeneratorRuntime.async(function page$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pageSize = 10;
          offset = pageNumber * pageSize;
          limit = pageSize;
          _context.next = 5;
          return regeneratorRuntime.awrap(modArticle.article.findAll({
            order: ['createdAt'],
            limit: limit,
            skip: offset
          }));

        case 5:
          articles = _context.sent;
          return _context.abrupt("return", articles);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function column(pageNumber) {
  var pageSize, offset, limit, columns;
  return regeneratorRuntime.async(function column$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pageSize = 2;
          offset = pageNumber * pageSize;
          limit = pageSize;
          _context2.next = 5;
          return regeneratorRuntime.awrap(modColumn.opinion_column.findAll({
            order: ['createdAt'],
            limit: limit,
            skip: offset
          }));

        case 5:
          columns = _context2.sent;
          return _context2.abrupt("return", columns);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function total_pages() {
  var articles, columns, total;
  return regeneratorRuntime.async(function total_pages$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(contrArticle.get_articles());

        case 2:
          articles = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(contrColumn.get_columns());

        case 5:
          columns = _context3.sent;
          total = articles.length + columns.length;
          total = total / 10;
          return _context3.abrupt("return", total);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  page: page,
  column: column,
  total_pages: total_pages
};