"use strict";

var mod = require('../models');

var idgen = require('../helpers/id_generator');

function set_relationship_article_category(idcategory, idarticle) {
  var id, relation;
  return regeneratorRuntime.async(function set_relationship_article_category$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = idgen.get_random_id();
          relation = new Object({
            id: id,
            articleId: idarticle,
            categoryId: idcategory
          });
          console.log("RR", relation);
          _context.next = 5;
          return regeneratorRuntime.awrap(mod.article_category.create(relation));

        case 5:
          return _context.abrupt("return", _context.sent);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  set_relationship_article_category: set_relationship_article_category
};