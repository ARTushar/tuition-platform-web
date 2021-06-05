import {
    BatchGetItemInput,
    DeleteItemCommandInput, GetItemCommandInput,
    PutItemCommandInput,
    QueryCommandInput,
    TransactWriteItem, UpdateItemCommandInput
} from '@aws-sdk/client-dynamodb';
import DynamodbConfig from './dynamodbConfig';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { getKeys } from '../../scripts/utils/utils';
import { debug } from '../../utils/helpers';

export const checkUniquePK: string = 'attribute_not_exists(PK)';
export const checkUniqueSK: string = 'attribute_not_exists(SK)';

export function generateDelTransactItem(pk: string, sk: string): TransactWriteItem {
    return {
        Delete: {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: pk,
                SK: sk
            })
        }
    }
}

export function generatePutTransactItem(item, condition=undefined): TransactWriteItem {
    let putItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall(item, {removeUndefinedValues: true}),
        }
    }
    if(condition){
        putItem.Put.ConditionExpression = condition;
    }
    return putItem;
}

export function mapItemToAlias(aliases, values) {
    let item = {};
    for(const key of Object.keys(aliases)){
        if(values[key] !== undefined) {
            item[aliases[key]] = values[key];
        }
    }
    return item;
}

export function mapItemFromAlias(aliases, values) {
    let item = {};
    for(const key of Object.keys(aliases)){
        item[key] =  values[aliases[key]];
    }
    return item;
}

export function generatePutTransactItemRaw(keyGenerator, params, values, type, gsiGenerators=undefined, condition=undefined): TransactWriteItem {
    const keys = keyGenerator(...params);
    let item = {
        PK: keys.PK,
        SK: keys.SK,
        ...values.mapToAlias(),
        '_tp': type
    };
    if(gsiGenerators) {
        for(const generator of gsiGenerators) {
            const gsiKeys = generator[0](generator[1])
            for(const key of Object.keys(gsiKeys)){
                item[key] = gsiKeys[key]
            }
        }
    }

    return generatePutTransactItem(item, condition);
}

export function generateUpdateTransactWriteItem(key, expression, names, values, condition=undefined): TransactWriteItem {
    let item: TransactWriteItem = {
        Update: {
            TableName: DynamodbConfig.tableName,
            Key: marshall(key),
            UpdateExpression: expression,
            ExpressionAttributeNames: names,
            ExpressionAttributeValues: marshall(values, { removeUndefinedValues:true}),
        }
    }
    if(condition) {
        item.Update['ConditionExpression'] = condition;
    }
    return item;
}

export function generatePutItemRaw(keyGenerators, params, values, type, condition=undefined): PutItemCommandInput{
    let item: PutItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Item: marshall(generateItemFromGenerators(keyGenerators, params, values, type), {removeUndefinedValues: true}),
    }
    if(condition) {
        item['ConditionExpression'] = condition;
    }
    return item;
}

export function generateDeleteItem(keyGenerators, params) {
    const key = keyGenerators(...params)
    const item: DeleteItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall(key)
    }
    return item;
}

function generateItemFromGenerators(keyGenerators, params, values, type) {
    let item = values.mapToAlias();
    let i = 0;
    for(const generator of keyGenerators) {
        const key = generator(...params[i]);
        for(const k of getKeys(key)) {
            item[k] = key[k];
        }
        i++;
    }
    item['_tp'] = type;
    return item;
}

export function generateQueryInput(keyConditionExpression, attributeNames, attributeValues, indexForward=false, indexName=undefined): QueryCommandInput {

    let queryInput: QueryCommandInput = {
        TableName: DynamodbConfig.tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeNames: attributeNames,
        ExpressionAttributeValues: marshall(attributeValues),
        ScanIndexForward: indexForward
    }
    if(indexName) {
        queryInput['IndexName'] = indexName;
    }
    return queryInput;
}


export function generateGetItem(keyGenerator, params) {
    const key = keyGenerator(...params)
     let item: GetItemCommandInput = {
         Key: marshall(key), TableName: DynamodbConfig.tableName
     }
     return item
}

export function generateUpdateItem(keyGenerator, params, updateAttributes: UpdateAttributes, condition=undefined): UpdateItemCommandInput {
    const key = keyGenerator(...params);
    let item: UpdateItemCommandInput = {
        ExpressionAttributeNames: updateAttributes.attributeNames,
        ExpressionAttributeValues: marshall(updateAttributes.attributeValues, { removeUndefinedValues: true}),
        Key: marshall(key),
        TableName: DynamodbConfig.tableName,
        UpdateExpression: updateAttributes.updateExpression
    };
    if(condition) item.ConditionExpression = condition;
    return item;
}

export function generateBatchGetItem(items, key, keyGenerator): BatchGetItemInput {
    let keys = [];
    for(const item of items) {
        debug("batch_get_item", item);
        keys.push(marshall(
            keyGenerator(item[key])
        ))
    }
    return {
        RequestItems: {
            [DynamodbConfig.tableName]: {
                Keys: keys
            }
        }
    };
}

interface UpdateAttributes {
    updated: boolean;
    updateExpression: string;
    attributeNames: { [key: string]: string };
    attributeValues: object;
}

export function generateUpdateAttributes(obj): UpdateAttributes {
    let attributeNames = {};
    let attributeValues = {};
    let updateExpression = 'set ';
    const aliasObj = obj.mapToAlias();
    let updated = false;

    for(const key of getKeys(aliasObj)) {
        // if(key === "id" || key === 'createdAt') continue;
        debug("generate update attributes", key, aliasObj[key]);
        if(aliasObj[key] !== undefined){
            const av = ':' + key;
            const an = '#' + key;
            attributeValues[av] = aliasObj[key];
            attributeNames[an] = key;
            updateExpression += `${an} = ${av}, `
            updated = true
        }
    }
    updateExpression = updateExpression.substr(0, updateExpression.length-2)
    return {updated, updateExpression, attributeNames, attributeValues};
}
