import {genRequestGSI1PK, genRequestPK} from "../utils/generateKeys";
import {QueryCommand, QueryCommandInput, QueryCommandOutput} from "@aws-sdk/client-dynamodb";
import {generateQueryInput} from "../utils/utils";
import dynamoDBClient from "../utils/getDynamoDBClient";
import {debug} from "../../utils/helpers";
import {unmarshall} from "@aws-sdk/util-dynamodb";
import Request from "../../models/request/Request";

export async function getTutorRequests(tutorId: string) {
    const conditionExpression = "#pk = :pk";
    const attributeNames = {
        '#pk': 'GSI1PK'
    };
    const attributeValues = {
        ':pk': genRequestGSI1PK(undefined, tutorId).GSI1PK
    };

    const params: QueryCommandInput = generateQueryInput({
            keyConditionExpression: conditionExpression,
            attributeNames, attributeValues, filterExpression: undefined, indexName: 'GSI1'
        }
    );

    const command = new QueryCommand(params);

    let requests: Request[] = [];

    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command);
        debug("getTutorRequests_response", JSON.stringify(response, null, 2));
        for (const item of response.Items) {
            requests.push(Request.mapFromAlias(unmarshall(item)));
        }
        return requests;
    } catch (e) {
        debug('getTutorRequests_error', e)
        throw e;
    }
}

export async function getStudentRequests(studentId: string) {
    const conditionExpression = "#pk = :pk";
    const attributeNames = {
        '#pk': 'PK'
    };
    const attributeValues = {
        ':pk': genRequestPK(studentId, undefined).PK
    };

    const params: QueryCommandInput = generateQueryInput({
            keyConditionExpression: conditionExpression,
            attributeNames, attributeValues, filterExpression: undefined,
        }
    );

    const command = new QueryCommand(params);

    let requests: Request[] = [];

    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command);
        debug("getStudentRequests_response", JSON.stringify(response, null, 2));
        for (const item of response.Items) {
            requests.push(Request.mapFromAlias(unmarshall(item)));
        }
        return requests;
    } catch (e) {
        debug('getStudentRequests_error', e)
        throw e;
    }
}
