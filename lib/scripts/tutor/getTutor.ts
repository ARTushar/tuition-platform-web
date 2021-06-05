#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import {getTutorByUserId} from "../../data-layer/entities/tutor/getTutor";

const argv = generateArgv();

(async ()=> {
    if(argv.id) {
        try {
            const tutor = await getTutorByUserId(argv.id);
            printObject(tutor);
        } catch(e){
            console.log(e);
        }
    }
    else {
        console.log("Error arguments")
    }
})();
