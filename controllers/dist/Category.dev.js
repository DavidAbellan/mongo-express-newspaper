"use strict";

var modCategory = require('../models');

var idgen = require('../helpers/id_generator');

function get_categories() {
  return regeneratorRuntime.async(function get_categories$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(modCategory.category.findAll());

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function set_category(name, code) {
  var category;
  return regeneratorRuntime.async(function set_category$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(new category({
            id: idgen.get_random_id(),
            name: name,
            code: code
          }));

        case 2:
          category = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(modCategory.category.save(category));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function get_category_by_code(categorycode) {
  var category;
  return regeneratorRuntime.async(function get_category_by_code$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(modCategory.findOne({
            code: categorycode
          }));

        case 2:
          category = _context3.sent;
          return _context3.abrupt("return", category);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  get_categories: get_categories,
  set_category: set_category,
  get_category_by_code: get_category_by_code
};