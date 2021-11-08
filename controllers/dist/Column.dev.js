"use strict";

var modColumn = require('../models');

var addColumn = require('../helpers/add_column_to_author');

var idgen = require('../helpers/id_generator');

function set_column(column) {
  var col;
  return regeneratorRuntime.async(function set_column$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          col = new column({
            id: idgen.get_random_id(),
            main_text: column.main_text,
            highlights: column.highlights,
            title: column.title,
            author: column.author,
            upload_at: Date.now()
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(modColumn.opinion_column.create(new column()));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(addColumn.set_new_column(col.author, col._id));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function get_columns() {
  return regeneratorRuntime.async(function get_columns$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(modColumn.opinion_column.findAll());

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function get_column_by_author(authorID) {
  return regeneratorRuntime.async(function get_column_by_author$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(modColumn.opinion_column.findByPk({
            author: authorID
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

function remove_column(id) {
  return regeneratorRuntime.async(function remove_column$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(modColumn.opinion_column.findByPk(id).destroy());

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function get_column_by_id(id) {
  return regeneratorRuntime.async(function get_column_by_id$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(modColumn.opinion_column.findByPk(id));

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function update_column(id, column) {
  return regeneratorRuntime.async(function update_column$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(modColumn.opinion_column.update({
            _id: id
          }, {
            title: column.title,
            highlights: column.highlights,
            main_text: column.main_text
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}

module.exports = {
  get_column_by_author: get_column_by_author,
  update_column: update_column,
  set_column: set_column,
  get_columns: get_columns,
  remove_column: remove_column,
  get_column_by_id: get_column_by_id
};