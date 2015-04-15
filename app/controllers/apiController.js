/**
 * Created by miroslawratman on 13/04/15.
 */

var config = require('../config/config');
var express = require('express');
var responseHelper = require('../helpers/response');
var _ = require('lodash');
var bodyParser = require('body-parser');
var fs = require('fs');
var jwt = require('jwt-simple');

/**
 * Method will generate random number
 * @param [integer] from
 * @param [integer] to
 * @return [integer]
 */
function random(from, to) {
    return Math.random() * (to - from) + from;
}


/**
 * Api main controller module exports
 * @return [object]
 */
module.exports = {

    /**
     * Method will add user
     * @param [object] req
     * @param [object] res
     * @param [function] next - callback function
     * @return [void]
     */
    addUser: function (req, res, next) {
        try {
            var usersParams = _.pick(req.body, 'email', 'password');

            //Create user
            req.models.users.create(usersParams, function (err, userResponse) {
                if (err) return res.status(409).send({type: "EmailExists", message: "Specified e-mail address is already registered."});

                //set access token
                var payload = {
                    id: userResponse.id,
                    email: userResponse.email,
                    random: random(0, 1000000000000)
                };
                tokenParams = {token: jwt.encode(payload, config.tokenSecret), api_users_id: userResponse.id};
                req.models.tokens.create(tokenParams, function (err) {
                    if (err) return responseHelper(res, 409, "TokenNotCreated", "Problem with create token.");
                });

                //Send response
                res.status(200).send(userResponse.serialize());
            });
        }
        catch (e) {
            return res.status(500).send({type: "InternalServerError", message: "Error occured durring user adding."});
        }
    },


    /**
     * Method will return access token
     * @param [object] req
     * @param [object] res
     * @param [function] next - callback function
     * @return [void]
     */
    getAccessToken: function (req, res, next) {
        try {
            var usersParams = _.pick(req.params, 'email', 'password');

            req.models.users.find(usersParams).limit(1).order('-id').one(function (err, usersResponse) {
                if (usersResponse != null) {
                    req.models.tokens.find({api_users_id: usersResponse.id}).limit(1).order('-id').one(function (err, tokenResponse) {
                        if (err) return responseHelper(res, 409, "TokenNotFound", "Token not found for specified credentials.");
                        res.status(200).send({ access_token: tokenResponse.token });
                    });
                }
                else {
                    return res.status(401).send({type: "InvlidEmailPassword", message: "Specified e-mail / password combination is not valid."});
                }
            })
        }
        catch (e) {
            return res.status(500).send({type: "InternalServerError", message: "Error occured durring access token getting."});
        }
    },


    /**
     * Method will add contact
     * @param [object] req
     * @param [object] res
     * @param [function] next - callback function
     * @return [void]
     */
    addContact: function (req, res, next) {
        try {
            var firebase = require('firebase');

            var contactParams = _.pick(req.body, 'firstName', 'lastName', 'phone');

            var f = new firebase(config.firebase.url);
            f.push(contactParams);

            res.status(201).send();
        }
        catch (e) {
            return res.status(500).send({type: "InternalServerError", message: "Error occured durring contact adding."});
        }
    },


    /**
     * Method will add photos
     * @param [object] req
     * @param [object] res
     * @param [function] next - callback function
     * @return [void]
     */
    addPhoto: function (req, res, next) {
        try {
            var cloudinary = require('cloudinary');
            cloudinary.config(config.cloudinary);

            cloudinary.uploader.upload(req.files.photo.path, function (result) {
                fs.unlink(req.files.photo.path, function (err) {
                    if (err) return res.status(401).send({type: "TemporaryFileNotDeleted", message: "Temporary file wasnt deleted."});
                });
                res.status(201).send();
            });
        }
        catch (e) {
            return res.status(500).send({type: "InternalServerError", message: "Error occured durring contact adding."});
        }
    }
}