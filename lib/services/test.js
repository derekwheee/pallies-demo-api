'use strict';

const Schmervice = require('schmervice');

const internals = {};

/**
 * @class TestService
 */
class TestService extends Schmervice.Service {

    initialize() {

        this.DemoUser = this.server.models().User;
    }

    async getUser(email) {

        return await this.DemoUser.query().findOne('email', email);
    }
}

module.exports = TestService;
