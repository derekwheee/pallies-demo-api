'use strict';

const PalliesConfig = require('../../server/.palliesrc');
const User = require('../models/user');

module.exports = (server, options) => ({
    plugins: {
        options: {
            isDev : options.isDev,
            User,
            ...PalliesConfig
        }
    }
});
