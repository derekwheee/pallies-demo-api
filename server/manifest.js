'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');
const PalliesConfig = require(`${__dirname}/.palliesrc`);

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {}
            },
            {
                plugin: 'pallies',
                options: {
                    isDev: {
                        $filter: {
                            $env: 'NODE_ENV'
                        },
                        $default: false,
                        production: false,
                        development: true
                    },
                    ...PalliesConfig
                }
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop
                }
            },
            {
                plugin: 'schwifty',
                options: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'pg',
                            connection: {
                                host: { $env: 'DB_HOST' },
                                user: { $env: 'DB_USER' },
                                password: { $env: 'DB_PASSWORD' },
                                database: { $env: 'DB_DATABASE' }
                            },
                            migrations: {
                                stub: 'Schwifty.migrationsStubPath'
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            }
        ]
    }
});
