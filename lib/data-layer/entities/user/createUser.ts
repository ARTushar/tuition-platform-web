import User from "../../../models/user/user";
import {genUserGSI1PK, genUserGSI2PK, genUserPK} from "../../utils/generateKeys";
import {
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput,
    TransactWriteItemsCommandOutput
} from "@aws-sdk/client-dynamodb";
import {checkUniquePK, generatePutTransactItem} from "../../utils/utils";
import {marshall} from "@aws-sdk/util-dynamodb";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug} from "../../../utils/helpers";

export default async function (user: User): Promise<User> {
    user.createdAt = new Date().toDateString();
    user.updatedAt = user.createdAt;

    const primaryKeys = genUserPK(user.id);
    const gsi1Keys = genUserGSI1PK(user.email);
    const gsi2Keys = genUserGSI2PK(user.mobileNumber);

    let userMarshallItem = {
        PK: primaryKeys.PK,
        SK: primaryKeys.SK,
        GSI1PK: gsi1Keys.GSI1PK,
        GSI1SK: gsi1Keys.GSI1SK,
        GSI2PK: gsi2Keys.GSI2PK,
        GSI2SK: gsi2Keys.GSI2SK,
        ...user.mapToAlias(),
        _tp: 'User'
    };

    const userItem: TransactWriteItem = generatePutTransactItem(
        marshall(userMarshallItem, { removeUndefinedValues: true }),
        checkUniquePK
    )

    const emailItem: TransactWriteItem = generatePutTransactItem(
        marshall({
            PK: gsi1Keys.GSI1PK,
            SK: gsi1Keys.GSI1SK,
            _tp: 'UserEmail'
        }),
        checkUniquePK
    );

    const mobileItem: TransactWriteItem = generatePutTransactItem(
        marshall({
            PK: gsi2Keys.GSI2PK,
            SK: gsi2Keys.GSI2SK,
            _tp: 'UserMobile'
        }),
        checkUniquePK
    );

    let items: TransactWriteItem[] = [userItem];
    if(user.email) items.push(emailItem);
    if(user.mobileNumber) items.push(mobileItem);


    const params: TransactWriteItemsCommandInput = {
        TransactItems: items,
    }
    const command: TransactWriteItemsCommand = new TransactWriteItemsCommand(params);

    try {
        const response:TransactWriteItemsCommandOutput = await dynamoDBClient.send(command)
        debug('user create response', response);
        return user;
    } catch (e) {
        debug('user create error', e)
        throw e;
    }
}