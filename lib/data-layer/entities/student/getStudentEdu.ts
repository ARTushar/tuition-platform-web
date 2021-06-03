import StudentEQ from "../../../models/user/student/studentEQ";
import {GetItemCommand, GetItemCommandInput, GetItemCommandOutput} from "@aws-sdk/client-dynamodb";
import {generateGetItem} from "../../utils/utils";
import {StudentEduAliases} from "../../utils/aliases";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug, objStringify} from "../../../utils/helpers";
import {unmarshall} from "@aws-sdk/util-dynamodb";

export async function getStudentEdu(id: string): Promise<StudentEQ> {
    const debugCode = 'getStudentEdu'
    const params: GetItemCommandInput = generateGetItem(StudentEduAliases, [id]);
    const command = new GetItemCommand(params);

    try {
        const response: GetItemCommandOutput = await dynamoDBClient.send(command);
        debug(debugCode, 'response', objStringify(response));
        if(response.Item) {
            return StudentEQ.mapFromAlias(unmarshall(response.Item));
        }
        return null
    } catch (e) {
        debug(debugCode, 'error', e);
        throw e;
    }
}