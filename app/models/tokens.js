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
    var Tokens = db.define('tokens', {
            token: { type: 'text', required: true },
            api_users_id: { type: 'text', required: true }
        },
        {
            methods: {
                serialize: function () {
                    return {
                        id: this.id,
                        token: this.token
                    };
                }
            }
        }
    );
};