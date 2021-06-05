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

export default async function createTutor(id: string, tutor: Tutor) {
    const debugCode = 'createTutor';

    tutor.userId = id;
    tutor.createdAt = new Date().toISOString();
    tutor.updatedAt = tutor.createdAt;

    let items: TransactWriteItem[] = [];
    const type = '_tp';
    const commonParams = {
        enabled: tutor.enabled,
        verified: tutor.verified,
        userId: tutor.userId
    }

    const ugEQ = tutor.educationQualifications.find(e => e.degree === 'undergraduate');
    if(!ugEQ) return null;


    const shortTutor = {
        ...commonParams,
        name: tutor.name,
        gender: tutor.gender,
        profilePicture: tutor.profilePicture,
        ugInstitute: ugEQ.institute,
        ugDepartment: ugEQ.department,
        rating: tutor.rating,
        country: tutor.preference.country,
        district: tutor.preference.district,
        areas: tutor.preference.areas,
    }

    let shortTutorGSIParams: GenShortTutorGSI1PKParams = {
        tuitionType: "",
        enabled: tutor.enabled,
        verified: tutor.verified,
        country: tutor.preference.country,
        district: tutor.preference.district,
        institute: ugEQ.institute,
        userId: tutor.userId
    }

    for (const rem of tutor.preference.remunerations) {
        shortTutorGSIParams.tuitionType = rem.type;
        const st = new ShortTutor({
            ...shortTutor,
            remuneration: rem
        });
        const stPk = genTutorShortPK(tutor.userId, rem.type);
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
            PK: tutorPK.PK,
            SK: tutorPK.SK,
            [type]: 'Tutor',
            GSI1PK: tutorGSI.GSI1PK,
            GSI1SK: tutorGSI.GSI1SK
        }, checkUniquePK
    ));

    const prefPK = genTutorPrefPK(tutor.userId);
    items.push(generatePutTransactItemRaw(genTutorPrefPK, [tutor.userId], tutor.preference, 'TutorPreference'));

    console.assert(items.length <= 25);

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