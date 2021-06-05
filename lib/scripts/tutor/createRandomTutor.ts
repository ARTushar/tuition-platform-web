#!/usr/bin/env ts-node

import {generateArgv, printObject} from '../utils/utils';
import createUser from "../../data-layer/entities/user/createUser";
import {generateRandomUser} from "../utils/data_generation/generateRandomUser";
import {generateRandomTutor} from "../utils/data_generation/generateRandomTutor";

const argv = generateArgv();

(async ()=> {
    const user = generateRandomUser();
    const tutor = generateRandomTutor(user);
    try {
        // const newUser = await createUser(user);
        printObject(tutor);
    } catch(e){
        console.log(e);
    }
})();
