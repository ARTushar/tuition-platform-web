const DynamodbConfig = {
    tableName: process.env.TABLE_NAME || "TuitionPlatform",
    awsRegion: process.env.AWS_REGION || "local",
    awsAccessKey: process.env.AWS_ACCESS_KEY || "local",
    dynamodbUrl: process.env.DYNAMODB_URL || "http://localhost:8000/"
}

export default DynamodbConfig;
