/**
 * Created by miroslawratman on 13/04/15.
 */

var orm = require('orm');
var settings = require('../config/config');
var connection = null;

/**
 * Method will setup db connection
 * @param [db instance] db
 * @param [cb instance] cb
 * @return [cb instance]
 */
function setup(db, cb) {
    require('./users')(orm, db);
    require('./tokens')(orm, db);
    return cb(null, db);
}

/**
 * Connection module exports
 * @param [cb instance] cb
 * @return [object]
 */
module.exports = function (cb) {
    if (connection) return cb(null, connection);

    orm.connect(settings.database, function (err, db) {
        if (err) return cb(err);

        connection = db;
        db.settings.set('instance.returnAllErrors', true);
        setup(db, cb);
    });
};