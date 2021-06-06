import {
    QueryCommand,
    QueryCommandInput,
    QueryCommandOutput,
    ScanCommand,
    ScanCommandInput
} from "@aws-sdk/client-dynamodb";
import {generateQueryInput, generateScanInput} from "../../utils/utils";
import {genShortTutorGSI1PK, genTutorGSI1PK, genTutorPK} from "../../utils/generateKeys";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import Tutor from "../../../models/tutor/tutor";
import {debug, objStringify} from "../../../utils/helpers";
import ShortTutor from "../../../models/tutor/shortTutor";
import {unmarshall} from "@aws-sdk/util-dynamodb";
import {RemunerationAliases, ShortTutorAliases, TutorAliases} from "../../utils/aliases";
import Remuneration from "../../../models/utils/remuneration";

export async function getTutorByUserId(userId: string) {
    const debugCode = 'getTutorByUserId';
    const pk = genTutorPK(userId);
    debug(debugCode, 'pk', pk);
    const params: QueryCommandInput = generateQueryInput(
        {
            keyConditionExpression : '#pk = :pk AND begins_with(#sk, :sk)',
            attributeNames : {
                '#pk': 'PK',
                '#sk': 'SK'
            },
            attributeValues : {
                ':pk': pk.PK,
                ':sk': pk.SK
            }}
    )

    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        debug(debugCode, 'response', objStringify(response));
        if (response.Items.length >= 1) {
            return Tutor.mapFromAlias(response.Items);
        }
        return null;
    } catch (e) {
        debug(debugCode, 'error', e);
        throw e;
    }
}

export async function getTutorByInstitute(enabled: boolean, verified: boolean, institute: string) {
    const pk = genTutorGSI1PK({
        enabled,
        verified,
        institute,
        rating: undefined,
        userId: undefined
    })

    const params: QueryCommandInput = generateQueryInput({
            keyConditionExpression : '#pk = :pk',
            attributeNames : {
                '#pk': 'GSI1PK',
            },
            attributeValues : {
                ':pk': pk.GSI1PK,
            },
            indexName: 'GSI1'
        }
    )
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }

}

interface TutorByLocationType {
    enabled: boolean;
    verified: boolean;
    type: string;
    country: string;
    district: string;
    institute?: string;
    area?: string;
    gender?: string;
    subjects?: string[];
    limit?: number;
    lastKey?: any;
}

export async function getTutorsByLoTypeGenSub({enabled, verified, type, country, district, institute, area, gender, subjects, limit=1000, lastKey}: TutorByLocationType) {
    const pk = genShortTutorGSI1PK({
        enabled,
        verified,
        country,
        district,
        institute,
        tuitionType: type,
        userId: undefined
    })

    let keyConditionExpression = '#pk = :pk';
    let attributeNames = {
        '#pk': 'GSI1PK',
    };
    let attributeValues = {
        ':pk': pk.GSI1PK,
    };
    let indexName = 'GSI1';
    let filterExpression = '';
    let ca = 1, cv = 1;
    if(area) {
        filterExpression += `contains(#f${ca}, :f${cv})`;
        attributeNames[`#f${ca}`] = ShortTutorAliases.areas;
        attributeValues[`:f${cv}`] = area;
        ca += 1;
        cv += 1;
    }
    if(gender) {
        if(filterExpression.length) filterExpression += ' AND '
        filterExpression += `#f${ca} = :f${cv}`;
        attributeNames[`#f${ca}`] = ShortTutorAliases.gender;
        attributeValues[`:f${cv}`] = gender;
        ca += 1;
        cv += 1;
    }
    if(subjects) {
        let remIx = ca;
        let subIx = ca+1;
        ca += 2;
        for(const sub of subjects) {
            if(sub){
                if(filterExpression.length) filterExpression += ' AND '
                filterExpression += `contains(#f${remIx}.#f${subIx}, :f${cv})`;
                attributeNames[`#f${remIx}`] = ShortTutorAliases.remuneration;
                attributeNames[`#f${subIx}`] = RemunerationAliases.subjects;
                attributeValues[`:f${cv}`] = sub;
                cv++;
            }
        }
    }
    debug('filter expression', filterExpression);

    const params: QueryCommandInput = generateQueryInput({
            keyConditionExpression,
            attributeNames ,
            attributeValues,
            filterExpression,
            indexName,
            limit,
            lastKey
        }
    )
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }

}

export async function getAllTutors() {
    const params: ScanCommandInput = generateScanInput({
        attributeNames: {'#tp': '_tp'},
        attributeValues: {':tp': 'Tutor'},
        filterExpression: '#tp = :tp',
    })
    const command = new ScanCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        debug('all tutors', 'response', objStringify(response));
        let results: ShortTutor[] = [];
        for (const rawItem of response.Items) {
            const item = unmarshall(rawItem);
            results.push(ShortTutor.mapFromAlias(item));
        }
        return {results, lastEvaluatedKey: response.LastEvaluatedKey};

    } catch (e) {
        debug('all tutors error', e);
        throw e;
    }
}

async function performQuery(params) {

    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command);
        debug('query', 'response', objStringify(response));
        debug("Last evaluated key: " + JSON.stringify(response.LastEvaluatedKey));
        let results: ShortTutor[] = [];
        for (const rawItem of response.Items) {
            const item = unmarshall(rawItem);
            results.push(ShortTutor.mapFromAlias(item));
        }
        return {results, lastEvaluatedKey: response.LastEvaluatedKey};
    } catch (e) {
        debug('query', 'error', e);
        throw e;
    }

}