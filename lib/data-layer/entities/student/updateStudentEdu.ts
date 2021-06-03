import {UpdateItemCommand, UpdateItemCommandInput, UpdateItemCommandOutput} from "@aws-sdk/client-dynamodb";
import {generateUpdateAttributes, generateUpdateItem} from "../../utils/utils";
import {generateStudentEduPrimaryKeys} from "../../utils/generateKeys";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug, objStringify} from "../../../utils/helpers";

export default async function updateStudentEdu(id: string, education: Education): Promise<boolean> {
    const debugCode = 'updateStudentEdu';
    education.updatedAt = new Date().toDateString();

    const attributes = generateUpdateAttributes(education);
    if (!attributes.updated) return null;

    const params: UpdateItemCommandInput = generateUpdateItem(
        generateStudentEduPrimaryKeys, [id], attributes
    )

    const command: UpdateItemCommand = new UpdateItemCommand(params);

    try {
        const response: UpdateItemCommandOutput = await dynamoDBClient.send(command);
        debug(debugCode, 'response', objStringify(response));
        return true;
    } catch(e) {
        debug(debugCode, 'error', e);
        throw e;
    }
}