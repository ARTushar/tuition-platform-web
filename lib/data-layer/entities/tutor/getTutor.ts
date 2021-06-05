import {QueryCommand, QueryCommandInput, QueryCommandOutput} from "@aws-sdk/client-dynamodb";
import {generateQueryInput} from "../../utils/utils";
import {genTutorPK} from "../../utils/generateKeys";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import Tutor from "../../../models/tutor/tutor";
import {debug, objStringify} from "../../../utils/helpers";

export async function getTutorByUserId(userId: string) {
    const debugCode = 'getTutorByUserId';
    const pk = genTutorPK(userId);
    debug(debugCode, 'pk', pk);
    const params: QueryCommandInput = generateQueryInput(
        '#pk = :pk AND begins_with(#sk, :sk)' ,
        {
            '#pk': 'PK',
            '#sk': 'SK'
        },
        {
            ':pk': pk.PK,
            ':sk': pk.SK
        }
    )

    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        debug(debugCode, 'response', objStringify(response));
        if (response.Items.length >= 1) {
            return Tutor.mapFromAlias(response.Items);
        }
        return null;
    } catch (e) {
        debug(debugCode, 'error', e);
        throw e;
    }
}
