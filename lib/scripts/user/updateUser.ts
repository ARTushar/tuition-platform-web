#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import {updateUser} from "../../data-layer/entities/user/updateUser";
import User from "../../models/user/user";

const argv = generateArgv();

(async ()=> {
    if(argv.userid) {
        const user = new User({
            id: argv.userid,
            name: argv.name,
            mobileNumber: argv.mobile,
            email: argv.email,
            accountType: argv.at,
            emailVerified: argv.emailV? argv.emailV === 'true': undefined,
        });
        try {
            const updatedUser = await updateUser(user);
            printObject(updatedUser);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log("Please provide userid");
    }
})();
