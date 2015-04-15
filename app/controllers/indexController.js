/**
 * Created by miroslawratman on 13/04/15.
 */

var settings = require('../config/config');

/**
 * Api main controller module exports
 * @param [object] req
 * @param [object] res
 * @param [function] next - callback function
 * @return [void]
 */
module.exports = function (req, res, next) {
    res.sendFile(settings.path + '/public/index.html');
};