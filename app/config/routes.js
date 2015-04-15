/**
 * Created by miroslawratman on 12/04/15.
 */

var controllers = require('../controllers')
var passport = require('passport');

/**
 * Routes module exports
 * @param [express instance] app
 * @return [void]
 */
module.exports = function (app) {
    app.get('/', controllers.index);
    app.get('/access_token/:email/:password', controllers.api.getAccessToken);
    app.post('/accounts', controllers.api.addUser);
    app.post('/contacts', passport.authenticate('bearer', { session: false }), controllers.api.addContact);
    app.post('/photos', passport.authenticate('bearer', { session: false }), controllers.api.addPhoto);
};