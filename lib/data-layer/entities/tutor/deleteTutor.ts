import {TransactWriteItem, TransactWriteItemsCommand, TransactWriteItemsInput} from "@aws-sdk/client-dynamodb";
import {genTutorPK, genTutorPrefPK, genTutorShortPK} from "../../utils/generateKeys";
import {generateDelTransactItem} from "../../utils/utils";
import Tutor from "../../../models/tutor/tutor";
import {getTutorByUserId} from "./getTutor";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug} from "../../../utils/helpers";

export default async function (userId: string): Promise<boolean> {
    const debugType = "DeleteTutor";
    let items: TransactWriteItem[] = [];
    console.assert(userId !== undefined);

    let oldTutor: Tutor;
    try {
        oldTutor = await getTutorByUserId(userId);
    } catch (e) {
        throw e;
    }

    const primaryKeys = genTutorPK(userId);

    items.push(generateDelTransactItem(primaryKeys.PK, primaryKeys.SK));

    for(const rem of oldTutor.preference.remunerations) {
        const stPk = genTutorShortPK(userId, rem.studentType);
        items.push(generateDelTransactItem(stPk.PK, stPk.SK));
    }

    const prefPk = genTutorPrefPK(userId);
    items.push(generateDelTransactItem(prefPk.PK, prefPk.SK));

    console.assert(items.length <= 25);

    const params: TransactWriteItemsInput = {
        TransactItems: items
    }

    const command = new TransactWriteItemsCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        debug(debugType, 'response', response);
        return true;
    } catch (e) {
        debug(debugType, 'error', e);
        throw e;
    }

}