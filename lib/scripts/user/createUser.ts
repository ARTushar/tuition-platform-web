#!/usr/bin/env ts-node

import {generateArgv, generateRandomString, printObject} from '../utils/utils';
import createUser from "../../data-layer/entities/user/createUser";
import User from "../../models/user/user";

const argv = generateArgv();

(async ()=> {
    const user = new User({
        name: argv.name,
        mobileNumber: argv.mobile,
        email: argv.email,
        accountType: argv.at,
        emailVerified: argv.emailV? argv.emailV === 'true': undefined,
        gender: argv.gender,
        id: generateRandomString(27),
    });
    try {
        const newUser = await createUser(user);
        printObject(newUser);
    } catch(e){
        console.log(e);
    }
})();
