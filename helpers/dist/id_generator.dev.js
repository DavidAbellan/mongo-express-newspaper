"use strict";

function get_random_id() {
  return String.fromCharCode(97 + Math.random() * 10) + Date.now();
}

module.exports = {
  get_random_id: get_random_id
};