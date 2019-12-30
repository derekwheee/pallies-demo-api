'use strict';

const PalliesUser = require('pallies/lib/models/user');
const Joi = require('@hapi/joi');

/**
 * @class DemoUser
 * @extends {User}
 */
class User extends PalliesUser {

    constructor() {

        super();
    }

    static get joiSchema() {

        return super.joiSchema.keys({
            address: Joi.string()
        });
    }
}

module.exports = User;
