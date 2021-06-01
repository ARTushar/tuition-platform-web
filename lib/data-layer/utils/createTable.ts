import {
    CreateTableCommand,
    CreateTableInput,
    CreateTableOutput,
    GlobalSecondaryIndex
} from '@aws-sdk/client-dynamodb';
import DynamodbConfig from './dynamodbConfig';
import dynamoDBClient from './getDynamoDBClient';

const createTable = async (primaryKey: string, sortKey:string, indexAttributes: string[], gsis: GlobalSecondaryIndex[]): Promise<CreateTableOutput> => {

    const params: CreateTableInput = {
        TableName: DynamodbConfig.tableName,
        KeySchema: [
            { AttributeName: primaryKey, KeyType: "HASH" },
            { AttributeName: sortKey, KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: primaryKey, AttributeType: "S"},
            { AttributeName: sortKey, AttributeType: "S"},
            ...generateAttributeDefinition(indexAttributes)
        ],
        BillingMode: 'PAY_PER_REQUEST',
        GlobalSecondaryIndexes: gsis
    }

    const command: CreateTableCommand = new CreateTableCommand(params);

    return await dynamoDBClient.send(command);
};

function generateAttributeDefinition(indexAttributes) {
    const items = [];
    for(const attribute of indexAttributes){
        items.push({
            AttributeName: attribute, AttributeType: "S"
        })
    }
    return items;
}

export default createTable;
