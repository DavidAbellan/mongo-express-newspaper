"use strict";

var modAuthor = require('../models');

var crypt = require('bcrypt');

var idgen = require('../helpers/id_generator');

function get_authors() {
  return regeneratorRuntime.async(function get_authors$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(modAuthor.author.findAll());

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function get_author_by_id(id) {
  return regeneratorRuntime.async(function get_author_by_id$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(modAuthor.author.findByPk(id));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function set_author(name, username, password, root) {
  var crPassword, id, author;
  return regeneratorRuntime.async(function set_author$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(crypt.hash(password, 3));

        case 2:
          crPassword = _context3.sent;
          console.log('controller name', name);
          id = name[0] + idgen.get_random_id() + username[0];
          author = new Object({
            id: id,
            name: name,
            username: username,
            password: crPassword,
            root: root
          });
          console.log('controller object', author);
          _context3.next = 9;
          return regeneratorRuntime.awrap(modAuthor.author.create(author));

        case 9:
          return _context3.abrupt("return", _context3.sent);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function get_id_by_username(username) {
  var user;
  return regeneratorRuntime.async(function get_id_by_username$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(modAuthor.author.findOne({
            username: username
          }));

        case 2:
          user = _context4.sent;
          return _context4.abrupt("return", user.id);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function get_author(userc, password) {
  var user;
  return regeneratorRuntime.async(function get_author$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(modAuthor.author.findOne({
            username: userc
          }));

        case 2:
          user = _context5.sent;

          if (user) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", undefined);

        case 7:
          return _context5.abrupt("return", user);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function update_author(id, author) {
  var crPassword;
  return regeneratorRuntime.async(function update_author$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(crypt.hash(author.password, 3));

        case 2:
          crPassword = _context6.sent;

          if (author.avatar === undefined) {
            author.avatar = new Object({
              fieldname: 'field',
              originalname: 'default-profile.png',
              mimetype: 'image/png',
              destination: '/public/images',
              filename: 'default-profile.png',
              path: 'public/images/default-profile.png'
            });
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(modAuthor.author.update({
            _id: id
          }, {
            name: author.name,
            username: author.username,
            avatar: author.avatar,
            password: crPassword
          }));

        case 6:
          return _context6.abrupt("return", _context6.sent);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function remove_author(id) {
  return regeneratorRuntime.async(function remove_author$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(modAuthor.author.findByPk(id).destroy());

        case 2:
          return _context7.abrupt("return", _context7.sent);

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}

module.exports = {
  update_author: update_author,
  get_author_by_id: get_author_by_id,
  remove_author: remove_author,
  get_authors: get_authors,
  set_author: set_author,
  get_author: get_author,
  get_id_by_username: get_id_by_username
};