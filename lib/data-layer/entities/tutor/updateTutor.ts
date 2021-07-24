import Tutor from "../../../models/tutor/tutor";
import {debug} from "../../../utils/helpers";
;
import deleteTutor from "./deleteTutor";
import createTutor from "./createTutor";

export default async function (userId: string, newTutor: Tutor, gender: string): Promise<Tutor> {
    const debugType = 'UpdateTutor';
    debug(debugType, newTutor);
    console.assert(userId !== undefined);
    newTutor.updatedAt = new Date().toISOString();

    try {
        await deleteTutor(userId);
        return await createTutor(userId, newTutor);
    } catch (e) {
        throw e;
    }
}