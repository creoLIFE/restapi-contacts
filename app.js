/**
 * Created by miroslawratman on 11/04/15.
 */

var express = require('express');
var config = require('./app/config/config');
var environment = require('./app/config/environment');
var routes = require('./app/config/routes');

//Instance framework
var app = express();

//Set environment
environment(app);

//Set routes
routes(app);

app.listen(config.port,function () {
    console.log(("Listening on port " + config.port));
});
