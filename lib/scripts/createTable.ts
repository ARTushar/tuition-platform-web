#!/usr/bin/env ts-node

import createGlobalSecondaryIndex from '../data-layer/utils/createGSI';
import createTable from '../data-layer/utils/createTable';
import {debug, objStringify} from "../utils/helpers";

const globalIndexes = [
    createGlobalSecondaryIndex({
        indexName: 'GSI1', primaryKey: 'GSI1PK', sortKey: 'GSI1SK'
    }),
    createGlobalSecondaryIndex({
        indexName: 'GSI2', primaryKey: 'GSI2PK', sortKey: 'GSI2SK'
    }),
    createGlobalSecondaryIndex({
        indexName: 'GSI3', primaryKey: 'GSI3PK', sortKey: 'GSI3SK'
    }),
    createGlobalSecondaryIndex({
        indexName: 'GSI4', primaryKey: 'GSI4PK', sortKey: 'GSI4SK'
    }),
    createGlobalSecondaryIndex({
        indexName: 'GSI5', primaryKey: 'GSI5PK', sortKey: 'GSI5SK'
    }),
    createGlobalSecondaryIndex({
        indexName: 'GSI6', primaryKey: 'GSI6PK', sortKey: 'GSI6SK'
    }),
];

const indexAttributes: string[] = ['GSI1PK', 'GSI1SK', 'GSI2PK', 'GSI2SK', 'GSI3PK', 'GSI3SK', 'GSI4PK', 'GSI4SK','GSI5PK', 'GSI5SK', 'GSI6PK', 'GSI6SK'];


(async () => {
    debug('global indexes', objStringify(globalIndexes));
    try {
        const response = await createTable('PK', 'SK', indexAttributes, globalIndexes);
        debug('table creation response', response)
    } catch (e) {
        console.log(e);
    }
})();
