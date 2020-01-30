const jwt = require('jsonwebtoken');
const goalActionsService = require('../services/goal-actions');

async function post(request, response) {
    const action = request.body.event.data.new;
    await goalActionsService.processAction(action);
}

module.exports = {
    post
}