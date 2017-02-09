
const constants = require('./constants');
/**
 * Module dependencies.
 */

var monk = require('monk');

/**
 * Expose `db`.
 */

module.exports = monk(constants.MONGO);
