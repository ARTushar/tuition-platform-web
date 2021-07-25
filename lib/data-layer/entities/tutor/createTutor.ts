import Tutor from "../../../models/tutor/tutor";
import {TransactWriteItem, TransactWriteItemsCommand, TransactWriteItemsInput} from "@aws-sdk/client-dynamodb";
import {
    genShortTutorGSI1PK, GenShortTutorGSI1PKParams,
    genTutorGSI1PK,
    genTutorPK, genTutorPrefPK,
    genTutorShortPK
} from "../../utils/generateKeys";
import {checkUniquePK, generatePutTransactItem, generatePutTransactItemRaw} from "../../utils/utils";
import ShortTutor from "../../../models/tutor/shortTutor";
import dynamoDBClient from "../../utils/getDynamoDBClient";
import {debug, objStringify} from "../../../utils/helpers";
import {ShortTutorAliases} from "../../utils/aliases";

export default async function createTutor(id: string, tutor: Tutor) {
    const debugCode = 'createTutor';

    tutor.userId = id;
    if(!tutor.createdAt) tutor.createdAt = new Date().toISOString();
    if(!tutor.updatedAt) tutor.updatedAt = tutor.createdAt;

    let items: TransactWriteItem[] = [];
    const type = '_tp';
    const commonParams = {
        enabled: tutor.enabled,
        verified: tutor.verified,
        userId: tutor.userId
    }

    const ugEQ = tutor.educationQualifications.find(e => e.degree === 'undergraduate');
    const district = tutor.preference.locations[0].district;
    const areas: string[] = [];
    for(const loc of tutor.preference.locations) {
        areas.push(loc.area);
    }
    if(!ugEQ) return null;


    const shortTutor = {
        ...commonParams,
        name: tutor.name,
        gender: tutor.gender,
        profilePicture: tutor.profilePicture,
        ugInstitute: ugEQ.institute,
        ugDepartment: ugEQ.department,
        rating: tutor.rating,
        country: tutor.preference.country? tutor.preference.country: 'Bangladesh',
        district,
        areas,
    }

    let shortTutorGSIParams: GenShortTutorGSI1PKParams = {
        tuitionType: "",
        enabled: tutor.enabled,
        verified: tutor.verified,
        country: tutor.preference.country,
        district ,
        institute: ugEQ.institute,
        userId: tutor.userId
    }

    for (const rem of tutor.preference.remunerations) {
        shortTutorGSIParams.tuitionType = rem.studentType;
        const st = new ShortTutor({
            ...shortTutor,
            remuneration: rem
        });
        const stPk = genTutorShortPK(tutor.userId, rem.studentType);
        const gsi1Pk = genShortTutorGSI1PK(shortTutorGSIParams);
        items.push(generatePutTransactItem({
            ...st.mapToAlias(),
            PK: stPk.PK,
            SK: stPk.SK,
            GSI1PK: gsi1Pk.GSI1PK,
            GSI1SK: gsi1Pk.GSI1SK,
            [type]: 'ShortTutor',

        }, checkUniquePK))
    }

    let mainTutor = new Tutor(tutor);
    delete mainTutor.preference;

    const tutorPK = genTutorPK(tutor.userId);
    const tutorGSI = genTutorGSI1PK({
        ...commonParams,
        institute: ugEQ.institute,
        rating: tutor.rating
    })
    items.push(generatePutTransactItem({
            ...mainTutor.mapToAlias(),
            [ShortTutorAliases.ugInstitute]: ugEQ.institute,
            [ShortTutorAliases.ugDepartment]: ugEQ.department,
            PK: tutorPK.PK,
            SK: tutorPK.SK,
            [type]: 'Tutor',
            GSI1PK: tutorGSI.GSI1PK,
            GSI1SK: tutorGSI.GSI1SK
        }, checkUniquePK
    ));

    items.push(generatePutTransactItemRaw(genTutorPrefPK, [tutor.userId], tutor.preference, 'TutorPreference'));

    console.assert(items.length <= 25);
    // debug('createTutor', 'transact items', objStringify(items));

    const params: TransactWriteItemsInput = {
        TransactItems: items
    }

    const command = new TransactWriteItemsCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        debug(debugCode, 'response', objStringify(response));
        return tutor;
    } catch (e) {
        debug(debugCode, 'error', e);
        throw e;
    }
}