/**
 * Created by miroslawratman on 13/04/15.
 */

/**
 * Users model module exports
 * @param [orm instance] orm
 * @param [db instance] db
 * @return [User instance]
 */
module.exports = function (orm, db) {
    var Users = db.define('users', {
            email: { type: 'text', required: true },
            password: { type: 'text', required: true }
        },
        {
            hooks: {
                beforeCreate: function (next) {
                    if( this.password === '' ){
                        return new Error('NoPasswordSpecified')
                    }
                    Users.exists({email: this.email}, function (err, exists) {
                        return exists ? next(new Error("EmailExists")) : next();
                    })
                }
            },
            validations: {
                email: [
                    orm.enforce.patterns.email("NotValidEmail")
                    // kind of alternative for checking if user exists - orm.enforce.unique("Already exists")
                ],
                password: [
                    orm.enforce.notEmptyString("NotEmptyString")
                ]
            },
            methods: {
                serialize: function () {
                    return {
                        id: this.id,
                        email: this.email,
                        password: this.password
                    };
                }
            }
        });
};