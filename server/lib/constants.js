/**
 * Created by kmarques on 09/02/2017.
 */

exports = {
  SECRET: process.env.JWT_TOKEN || 'jwt_token',
  MONGO: process.env.MONGOLAB_URI || 'mongodb://localhost/ladder'
};