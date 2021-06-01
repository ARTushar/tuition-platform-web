import { GlobalSecondaryIndex } from '@aws-sdk/client-dynamodb';


interface CreateGSI {
    indexName: string;
    primaryKey: string;
    sortKey: any;
    attributes?: string[];
}

export default function createGlobalSecondaryIndex({indexName, primaryKey, sortKey, attributes}: CreateGSI): GlobalSecondaryIndex {
    return {
        IndexName: indexName,
        KeySchema: [
            {AttributeName: primaryKey, KeyType: 'HASH'},
            {AttributeName: sortKey, KeyType: 'RANGE'}
        ],
        Projection: {
            ProjectionType: 'ALL', // To DO: Need to change
            // NonKeyAttributes: attributes
        },
    }
}
