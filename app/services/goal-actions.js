const goalsService = require("./goals");

async function processAction(action) {
    if (action.name == "delegate") {
        const parentGoal = await goalsService.getById(action.goal_id);
        const delegatedGoal = {
            parentId: parentGoal.id,
            description: parentGoal.description,
            verificationMethod: parentGoal.verification_method,
            type: parentGoal.type,
            category: 2,
            weight: action.data.weight,
            state: "in_review",
            dateFrom: parentGoal.date_from,
            dateTo: parentGoal.date_to,
            createdById: parentGoal.created_by_id,
            delegatedToId: action.data.delegated_to_id,
            verifierId: parentGoal.verifier_id
        };
        await goalsService.createNew(delegatedGoal);
        if (parentGoal.state == "draft") {
            await goalsService.changeState(parentGoal.id, "in_review");
        }
    }
    else if (action.name == "in_work") {
        await goalsService.changeState(action.goal_id, "in_work");
    }
}

module.exports = {
    processAction
}
