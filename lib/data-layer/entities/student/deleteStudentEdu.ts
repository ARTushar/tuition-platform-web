import {
    DeleteItemCommand,
    DeleteItemCommandInput,
    DeleteItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import {generateDeleteItem} from "../../utils/utils";
import {genStudentEduPK} from "../../utils/generateKeys";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug, objStringify} from "../../../utils/helpers";

export default async function deleteStudentEdu(id: string): Promise<boolean> {
    const debugCode: string = 'deleteStudentEdu';
    const params: DeleteItemCommandInput = generateDeleteItem(genStudentEduPK, [id]);

    const command = new DeleteItemCommand(params);
    try {
        const response: DeleteItemCommandOutput = await dynamoDBClient.send(command);
        debug(debugCode, 'response', objStringify(response));
        return true;
    } catch (e) {
        debug(debugCode, 'error', e)
        throw e;
    }
}