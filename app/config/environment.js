/**
 * Created by miroslawratman on 12/04/15.
 */

var path = require('path');
var express = require('express');
var config = require('./config');
var models = require('../models/');
var passport = require('passport');
var multer = require('multer');
var orm = require("orm");
var bearerStrategy = require('passport-http-bearer').Strategy;
var bodyParser = require('body-parser');

/**
 * Environment module exports
 * @param [express instance] app
 * @return [object]
 */
module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
    app.set('port', config.port);
    app.use(express.static(path.join(config.path, 'public')));
    app.use(multer({ dest: '../uploads/'}));
    app.use(function (req, res, next) {
        models(function (err, db) {
            if (err) return next(err);
            req.models = db.models;
            req.db = db;
            return next();
        });
    });

    passport.use(new bearerStrategy({
            passReqToCallback: true
        },
        function (req, token, done) {
            req.models.tokens.find({token: token}).limit(1).order('-id').one(function (err, tokenResponse) {
                if (err) {
                    return done(err)
                }
                if (!tokenResponse) {
                    return done(null, false)
                }
                return done(null, tokenResponse, { scope: 'all' })
            });
        }
    ));
    app.use(passport.initialize());
};