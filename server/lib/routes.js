/**
 * Module dependencies.
 */

const render = require('./render');
const User = require('./user');
const Game = require('./game');
const rank = require('./elo');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

/**
 * Render index html page.
 */

exports.index = function *() {
  return this.body = yield render('index');
};

exports.connect = function *() {
  const load = this.request.body,
    user = yield User.findOne({name: new RegExp('^' + load.username + '$', 'i')});

  if (user && bcrypt.compareSync(load.password, user.password)) {
    const token = jsonwebtoken.sign(
      {
        uid: user._id,
        admin: user.admin,
        name: user.name,
        games: user.games,
        rating: user.rating
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: '1d'
      }
    );

    return this.body = {token}
  }
  return this.throw('Unknown user', 403);
};

exports.checktoken = function *() {
  let load = this.request.body;

  if (!load.token) {
    return this.throw('No token present', 401);
  }

  try {
    jsonwebtoken.verify(load.token, process.env.JWT_TOKEN);
  } catch (err) {
    return this.throw('Invalid token', 403);
  }

  tokenData = jsonwebtoken.decode(load.token, process.env.JWT_TOKEN);
  let user = yield User.findOne({"_id": tokenData.uid});

  const token = jsonwebtoken.sign(
    {
      uid: user._id,
      admin: user.admin,
      name: user.name,
      games: user.games,
      rating: user.rating
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: '1d'
    }
  );

  return this.body = {token};
};

/**
 * User routes
 */

exports.user = {
  /**
   * List users.
   */

  list: function *() {
    return this.body = yield User.find({});
  },

  /**
   * Create user
   */

  create: function *() {
    var load = this.request.body;
    return this.body = yield User.create(load);
  },

  /**
   * Delete user
   */

  remove: function *(name) {
    return this.body = yield User.remove({name: name});
  }
};

/**
 * Game routes
 */
exports.game = {
  /**
   * List games.
   */

  list: function *() {
    return this.body = yield Game.find({}, {sort: {createdAt: -1}});
  },

  /**
   * Get a game
   */

  fetch: function *(id) {
    var game = yield Game.findById(id);
    if (!game) throw this.throw('cannot find that game', 404);
    return this.body = game;
  },

  /**
   * Create a game with results.
   */

  create: function *() {
    var load = this.request.body;
    return this.body = yield rank(load.winner, load.loser);
  },

  /**
   * Delete a game with results.
   */

  delete: function *(id) {
    var res = yield Game.delete(id);

    if (res instanceof TypeError) {
      return this.throw(res.message, 400);
    } else if (res instanceof URIError) {
      return this.throw(res.message, 404);
    }
    return this.body = null;
  }
};
