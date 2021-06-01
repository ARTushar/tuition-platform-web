import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from './dynamodbConfig';

const dynamoDBClient = new DynamoDBClient({
    region: DynamodbConfig.awsRegion,
    endpoint: DynamodbConfig.dynamodbUrl
})

export default dynamoDBClient;
