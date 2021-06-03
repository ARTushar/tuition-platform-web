import User from "../../../models/user/user";
import {genUserGSI1PK, genUserGSI2PK, genUserPK} from "../../utils/generateKeys";
import {
    GetItemCommand,
    GetItemCommandInput,
    GetItemCommandOutput,
    QueryCommand,
    QueryCommandInput, QueryCommandOutput
} from "@aws-sdk/client-dynamodb";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import DynamodbConfig from "../../utils/dynamodbConfig";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {generateQueryInput} from "../../utils/utils";
import {debug} from "../../../utils/helpers";

export async function  getUserById(userId: string): Promise<User> {
    const primaryKeys = genUserPK(userId);
    const params: GetItemCommandInput = {
        Key: marshall(primaryKeys),
        // ProjectionExpression: '', TODO: add required attributes
        TableName: DynamodbConfig.tableName
    }
    const command = new GetItemCommand(params);

    try {
        const response: GetItemCommandOutput = await dynamoDBClient.send(command)
        if(response.Item){
            const user = unmarshall(response.Item);
            return User.mapFromAlias(user);
        }
        return null;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getUserByEmail(email: string): Promise<User> {
    console.log("email: " + email)
    const gsi1Keys = genUserGSI1PK(email);

    const params: QueryCommandInput = generateQueryInput(
        '#pk = :pk AND #sk = :sk', {
            "#pk": "GSI1PK",
            "#sk": "GSI1SK"
        }, {
            ":pk": gsi1Keys.GSI1PK,
            ":sk": gsi1Keys.GSI1SK
        }, false, 'GSI1'
    )

    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        debug('query user by email response', response);
        if(response.Items.length == 1){
            const user = unmarshall(response.Items[0]);
            return User.mapFromAlias(user);
        }
        return null;
    } catch (e) {
        debug('query user by email error', e);
        throw e;
    }
}

export async function getUserByMobile(mobile: string): Promise<User> {
    const gsi2Keys = genUserGSI2PK(mobile);
    const params: QueryCommandInput = generateQueryInput(
        '#pk = :pk AND #sk = :sk', {
            "#pk": "GSI2PK",
            "#sk": "GSI2SK"
        }, {
            ":pk": gsi2Keys.GSI2PK,
            ":sk": gsi2Keys.GSI2SK
        }, false, 'GSI2'
    )
    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        debug('query user by mobile response', response);
        if(response.Items.length == 1){
            const user = unmarshall(response.Items[0]);
            return User.mapFromAlias(user);
        }
        return null;
    } catch (e) {
        debug('query user by mobile error', e);
        throw e;
    }
}

//  TODO: implement fetch users query
// export async function getUsers(descendingOrder: boolean = true): Promise<User[]> {
//
// }
