'use script'

const handlers = require('./lib/handlers');
const client = require('./lib/FMServerClient/index');

module.exports.register = function (server, options, next) {

    /**
     * add the FileMaker Server Client to the request object
     * so we can use it in the handlers
     */
    server.decorate('request', 'fms', client )

    server.route([
        {
            method: 'Get',
            path: '/',
            handler: function (request, reply) {
                reply('Hello, world!');
            }
        },
        {
            method : 'GET',
            path : '/dbnames',
            handler : handlers.dbnames
        }


    ])

    next()
};

exports.register.attributes = {
    name: 'fmsjsonapi',
    version: '0.0.1'
};