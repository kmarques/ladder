/**
 * Module dependencies.
 */

var db = require('./db');
var wrap = require('co-monk');
var User = wrap(db.get('user'));

/**
 * Expose `User`.
 */

module.exports = User;

/**
 * Upsert user.
 */

User.create = function *(user) {
  var exists = yield this.findOne({name: user.name});
  if (!exists) return yield this.insert(newUser(user));
  return 'User already exists';
};

/**
 * Return new user object.
 */

function newUser(user) {
  return {
    name: user.name || '',
    gif: user.gif || '',
    password: 'password',
    admin: user.admin || false,
    rating: 1500,
    games: 0,
    createdAt: Date.now()
  };
}
