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
];

const indexAttributes: string[] = ['GSI1PK', 'GSI1SK', 'GSI2PK', 'GSI2SK'];


(async () => {
    debug('global indexes', objStringify(globalIndexes));
    try {
        const response = await createTable('PK', 'SK', indexAttributes, globalIndexes);
        debug('table creation response', response)
    } catch (e) {
        console.log(e);
    }
})();
