#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import {getTutorsByLoTypeGenSub} from "../../data-layer/entities/tutor/getTutor";

const argv = generateArgv();

(async ()=> {
    if(argv.type) {
        try {
            const tutors = await getTutorsByLoTypeGenSub({
                enabled: true,
                verified: false,
                type: argv.type,
                country: 'Bangladesh',
                district: argv.district,
                institute: argv.ins,
                area: argv.area,
                gender: argv.gender,
                subjects: [argv.sub]
            });
            printObject(tutors);
        } catch(e){
            console.log(e);
        }
    }
    else {
        console.log("Error arguments")
    }
})();
