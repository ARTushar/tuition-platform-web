#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import {getTutorByInstitute} from "../../data-layer/entities/tutor/getTutor";

const argv = generateArgv();

(async ()=> {
    if(argv.ins) {
        try {
            const tutors = await getTutorByInstitute(true, false, argv.ins);
            printObject(tutors);
        } catch(e){
            console.log(e);
        }
    }
    else {
        console.log("Error arguments")
    }
})();
