#!/usr/bin/env ts-node

import {generateArgv, printObject} from '../utils/utils';
import createUser from "../../data-layer/entities/user/createUser";
import {generateRandomUser} from "../utils/data_generation/generateRandomUser";
import {generateRandomTutor} from "../utils/data_generation/generateRandomTutor";
import createTutor from "../../data-layer/entities/tutor/createTutor";
import {debug, objStringify} from "../../utils/helpers";

const argv = generateArgv();

(async ()=> {
    const user = generateRandomUser();
    let newUser;
    try {
         newUser = await createUser(user, "123456");
        printObject(newUser);
    } catch(e){
        console.log(e);
    }

    const tutor = generateRandomTutor(newUser);
    debug('random tutor', objStringify(tutor));
    try {
        const newTutor = await createTutor(user.id, tutor);
        printObject(newTutor);
    } catch(e){
        console.log(e);
    }
})();
