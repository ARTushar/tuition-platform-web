#!/usr/bin/env ts-node

import {generateArgv, generateRandomString, printObject} from '../utils/utils';
import createUser from "../../data-layer/entities/user/createUser";
import User from "../../models/user/user";
import {generateRandomUser} from "../utils/data_generation/generateRandomUser";

const argv = generateArgv();

(async ()=> {
    const user = generateRandomUser();
    try {
        const newUser = await createUser(user);
        printObject(newUser);
    } catch(e){
        console.log(e);
    }
})();
