import User from "../../../models/user/user";
import {getUserById} from "./getUser";
import {genUserGSI1PK, genUserGSI2PK, genUserPK} from "../../utils/generateKeys";
import {generateDelTransactItem} from "../../utils/utils";
import {
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput,
    TransactWriteItemsCommandOutput
} from "@aws-sdk/client-dynamodb";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug} from "../../../utils/helpers";

export async function deleteUserById(userId: string): Promise<User> {
    const user: User = await getUserById(userId);
    if(!user) return null;

    //TODO: delete all firebase sessions

    const primaryKeys = genUserPK(user.id);
    const gsi1Keys = genUserGSI1PK(user.email);
    const gsi2Keys = genUserGSI2PK(user.mobileNumber);

    let items: TransactWriteItem[] = [generateDelTransactItem(primaryKeys.PK, primaryKeys.SK)];
    if(user.mobileNumber) items.push(generateDelTransactItem(gsi2Keys.GSI2PK, gsi2Keys.GSI2SK));
    if(user.email) items.push(generateDelTransactItem(gsi1Keys.GSI1PK, gsi1Keys.GSI1SK));

    //assure the length is less than 25 (hard limit of transact write)
    console.assert(items.length <= 25);

    const params: TransactWriteItemsCommandInput = {
        TransactItems: items,
    }
    const command: TransactWriteItemsCommand = new TransactWriteItemsCommand(params);

    try {
        const response:TransactWriteItemsCommandOutput = await dynamoDBClient.send(command)
        debug('delete user response', response);
        return user;
    } catch (e) {
        debug('delete user error', e);
        throw e;
    }
}

