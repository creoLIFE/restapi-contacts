/**
 * Created by miroslawratman on 11/04/15.
 */

var path = require('path');

/**
 * Config module exports
 * @return [object]
 */
module.exports = {
    path: path.normalize(path.join(__dirname, '..')),
    port: process.env.NODE_PORT || 8080,
    database: {
        protocol: "mysql",
        query: { pool: true },
        host: "localhost",
        database: "rest_api",
        user: "test",
        password: ""
    },
    tokenSecret: "J^cjJcrj6Rk6uxrJcV^vj",
    firebase: {
        url: ""
    },
    cloudinary: {
        cloud_name: "",
        api_key: "",
        api_secret: ""
    }
};
