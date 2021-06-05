#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import {getUserByEmail, getUserById, getUserByMobile} from "../../data-layer/entities/user/getUser";

const argv = generateArgv();

(async ()=> {
    if(argv.id) {
        try {
            const user = await getUserById(argv.id);
            printObject(user);
        } catch(e){
            console.log(e);
        }
    }

    else if(argv.email) {
        try {
            const user = await getUserByEmail(argv.email);
            printObject(user);
        } catch(e){
            console.log(e);
        }
    }

    else if(argv.mobile) {
        try {
            const user = await getUserByMobile(argv.mobile);
            printObject(user);
        } catch(e){
            console.log(e);
        }
    }
    else {
        console.log("Error arguments")
    }
})();
