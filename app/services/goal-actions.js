const goalsService = require("./goals");

async function processAction(action) {
    if (action.name == "delegate") {
        const parentGoal = await goalsService.getById(action.data.goal_id);
        const delegatedGoal = {
            parentId: parentGoal.id,
            description: parentGoal.description,
            verificationMethod: parentGoal.verification_method,
            type: parentGoal.type,
            category: 2,
            weight: parentGoal.weight,
            state: parentGoal.state,
            dateFrom: parentGoal.date_from,
            dateTo: parentGoal.date_to,
            createdById: parentGoal.created_by_id,
            delegatedToId: action.data.delegated_to_id,
            verifierId: parentGoal.verifier_id
        };
        await goalsService.createNew(delegatedGoal);
    }
    else if (action.name == "in_work") {
        await goalsService.changeStatus(action.goal_id, "in_progress");
    }
}

module.exports = {
    processAction
}
