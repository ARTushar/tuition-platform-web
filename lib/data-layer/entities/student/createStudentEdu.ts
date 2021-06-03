import StudentEQ from "../../../models/student/studentEQ";
import {genStudentEduPK} from "../../utils/generateKeys";
import {PutItemCommand, PutItemCommandInput} from "@aws-sdk/client-dynamodb";
import {checkUniquePK, generatePutItemRaw} from "../../utils/utils";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug, objStringify} from "../../../utils/helpers";

export default async function createStudentEdu(id: string, education: StudentEQ): Promise<Education> {
    const debugCode = 'CreateStudent'
    education.createdAt = new Date().toISOString();
    education.updatedAt = education.createdAt;

    const params: PutItemCommandInput = generatePutItemRaw(
        [genStudentEduPK],
        [[id]], education, 'StudentEducation', checkUniquePK
    )

    const command = new PutItemCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        debug(debugCode, "response", objStringify(response));
        return education;
    } catch (e) {
        debug(debugCode, "error", e)
        throw e;
    }

}