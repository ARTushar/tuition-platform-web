import {
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput,
    TransactWriteItem
} from '@aws-sdk/client-dynamodb';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { getUserById } from './getUser';
import { genUserGSI1PK, genUserGSI2PK, genUserPK } from '../../utils/generateKeys';
import { getKeys } from '../../../scripts/utils/utils';
import User from "../../../models/user/user";
import {debug, objStringify} from "../../../utils/helpers";
import {UserAliases} from "../../utils/aliases";
import {
    checkUniquePK,
    generateDelTransactItem,
    generatePutTransactItem,
    generateUpdateTransactWriteItem
} from "../../utils/utils";

export async function updateUser(user: User): Promise<User> {
    debug("updating user ", objStringify(user));
    user.updatedAt = new Date().toISOString();
    let oldUser;
    try {
        oldUser = await getUserById(user.id);
        if(!oldUser) return null;
    } catch (e) {
        throw e;
    }
    // check same values as before
    const updated = deleteSameFields(oldUser, user);
    if(!updated) return null;

    const updatedVals = generateUpdateAttributes(user)

    debug("updating user" + objStringify(user));
    debug("updated vals " + objStringify(updatedVals));

    const oldGsi1Keys = genUserGSI1PK(oldUser.email);
    const oldEmailItem: TransactWriteItem = generateDelTransactItem(oldGsi1Keys.GSI1PK, oldGsi1Keys.GSI1SK);

    const oldGsi2Keys = genUserGSI2PK(oldUser.mobileNumber);
    const oldMobileItem: TransactWriteItem = generateDelTransactItem(oldGsi2Keys.GSI2PK, oldGsi2Keys.GSI2SK);

    const gsi1Keys = genUserGSI1PK(user.email);
    const emailItem: TransactWriteItem = generatePutTransactItem({
            PK: gsi1Keys.GSI1PK,
            SK: gsi1Keys.GSI1SK,
            _tp: "UserEmail"
        }, checkUniquePK
    )

    const gsi2Keys = genUserGSI2PK(user.mobileNumber);
    const mobileItem: TransactWriteItem = generatePutTransactItem({
            PK: gsi2Keys.GSI2PK,
            SK: gsi2Keys.GSI2SK,
            _tp: "UserMobile"
        }, checkUniquePK
    )

    const primaryKeys = genUserPK(user.id);

    const userItem: TransactWriteItem = generateUpdateTransactWriteItem(
        primaryKeys, updatedVals.updateExpression, updatedVals.attributeNames, updatedVals.attributeValues
    );

    let items: TransactWriteItem[] = [userItem];
    if(user.email && oldUser.email !== user.email) {
        if(oldUser.email) items.push(oldEmailItem);
        items.push(emailItem);
    }
    if(user.mobileNumber && oldUser.mobileNumber !== user.mobileNumber) {
        if(oldUser.mobileNumber) items.push(oldMobileItem);
        items.push(mobileItem);
    }

    const params: TransactWriteItemsCommandInput = {
        TransactItems: items
    }
    const command = new TransactWriteItemsCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        debug('update user response', response);
        return user;
    } catch (e) {
        debug('update user error', e);
        throw e;
    }
}

function generateUpdateAttributes(user: User) {
    let attributeNames = {};
    let attributeValues = {};
    let updateExpression = 'set ';

    for(const key of Object.keys(user)) {
        if(key === "id" || key === 'createdAt' || key === 'gender') continue;
        if(user[key] !== undefined){
            const alias = UserAliases[key];
            const av = ':' + alias;
            const an = '#' + alias;
            attributeValues[av] = user[key];
            attributeNames[an] = alias;
            updateExpression += `${an} = ${av}, `
            if(key === 'email') {
                const gsi1Keys = genUserGSI1PK(user.email);
                attributeValues[":gsi1pk"] = gsi1Keys.GSI1PK;
                attributeValues[":gsi1sk"] = gsi1Keys.GSI1SK;
                attributeNames["#gsi1pk"] = "GSI1PK";
                attributeNames["#gsi1sk"] = "GSI1SK";
                updateExpression += '#gsi1pk = :gsi1pk, #gsi1sk = :gsi1sk, ';
            }
            if(key === 'mobileNumber') {
                const gsi2Keys = genUserGSI2PK(user.mobileNumber);
                attributeValues[":gsi2pk"] = gsi2Keys.GSI2PK;
                attributeValues[":gsi2sk"] = gsi2Keys.GSI2SK;
                attributeNames["#gsi2pk"] = "GSI2PK";
                attributeNames["#gsi2sk"] = "GSI2SK";
                updateExpression += '#gsi2pk = :gsi2pk, #gsi2sk = :gsi2sk, ';
            }
        }
    }
    updateExpression = updateExpression.substr(0, updateExpression.length-2)
    return {updateExpression, attributeNames, attributeValues};
}

function deleteSameFields(oldObject, newObject): boolean {
    let updated = false;
    for (const key of getKeys(oldObject)) {
        if (key === 'id' || key === 'updatedAt') continue;
        if (oldObject[key] === newObject[key]) {
            delete newObject[key];
        }
        if (newObject[key] === undefined) delete newObject[key]
    }
    if (getKeys(newObject).length > 2) updated = true;
    return updated;
}
