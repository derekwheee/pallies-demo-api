'use strict';

module.exports = {
    method: 'GET',
    path: '/test',
    options: {
        handler: async (request, h) => {

            const TestService = h.services().testService;
            const { email } = request.query;

            const results = await TestService.getUser(email);

            return results;
        }
    }
};
