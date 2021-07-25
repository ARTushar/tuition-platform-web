import Request from "../../models/request/Request";
import {genRequestGSI1PK, genRequestPK} from "../utils/generateKeys";
import {PutItemCommand, PutItemCommandInput} from "@aws-sdk/client-dynamodb";
import {generatePutItemRaw} from "../utils/utils";
import dynamoDBClient from "../utils/getDynamoDBClient";
import {debug, generateID} from "../../utils/helpers";

export default async function(request: Request): Promise<Request> {
    const createdAt = new Date().toISOString();
    const defaultStatus = 'sent';
    request.requestId = await generateID();
    request.createdAt = createdAt;
    request.updatedAt = createdAt;
    request.status = defaultStatus;

    const params: PutItemCommandInput = generatePutItemRaw(
        [genRequestPK, genRequestGSI1PK],
        [[request.studentId, request.tutorId], [request.studentId, request.tutorId]], request, 'Request'
    )

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        debug("CreateRequest_response", JSON.stringify(response, null, 2));
        return request;
    } catch (e) {
        throw e;
    }
}
