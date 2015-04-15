/**
 * Created by miroslawratman on 14/04/15.
 */

/**
 * Error helpers module exports
 * @return [object]
 */
module.exports = function (res, status, type, message) {
    status = typeof status === 'undefined' ? 404 : status;
    var err = {
        type: type,
        message: message
    }

    res.status(status).send(err.serialize());
};