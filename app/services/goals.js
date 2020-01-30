const { query } = require('graphqurl');
const config = require('../../config');

const REQ_HEADERS = {
    'x-hasura-admin-secret': config.adminSecret
};

const QUERY_GOAL_BY_ID = `
query goalById($id: Int!) {
    goals_by_pk(id: $id) {
        id
        category
        created_by_id
        date_from
        date_to
        delegated_to_id
        description
        parent_id
        state
        type
        verification_method
        verifier_id
        weight
    }
  }
`;

const MUTATION_INSERT_GOAL = `mutation insertGoal (
    $parentId: Int,
    $description: String,
    $verificationMethod: String,
    $type: smallint!,
    $category: smallint!,
    $weight: smallint!,
    $state: String!,
    $dateFrom: date,
    $dateTo: date,
    $createdById: String!,
    $delegatedToId: String,
    $verifierId: String
    ) {
    insert_goals(objects:
        {
            parent_id: $parentId,
            description: $description,
            verification_method: $verificationMethod,
            type: $type,
            category: $category,
            weight: $weight,
            state: $state,
            date_from: $dateFrom,
            date_to: $dateTo,
            created_by_id: $createdById,
            delegated_to_id: $delegatedToId,
            verifier_id: $verifierId
        }) {
      returning {
        id
      }
    }
  }
`;

async function getById (id) {
    const response = await query({
        query: QUERY_GOAL_BY_ID,
        endpoint: config.hasuraEndpoint,
        variables: { "id": id },
        headers: REQ_HEADERS}
    );
    return response.data.goals_by_pk;
}

async function createNew (o) {
    const response = await query({
        query: MUTATION_INSERT_GOAL,
        endpoint: config.hasuraEndpoint,
        variables: o,
        headers: REQ_HEADERS}
    );
    return response.data.insert_goals.returning;
}

async function changeStatus (goalId, newStatus) {

}

module.exports = {
    getById,
    createNew,
    changeStatus
}