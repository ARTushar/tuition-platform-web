#!/usr/bin/env ts-node

import {generateArgv, generateRandomString, printObject} from '../utils/utils';
import StudentEQ from "../../models/user/student/studentEQ";
import createStudentEdu from "../../data-layer/entities/student/createStudentEdu";

const argv = generateArgv();

(async ()=> {
    if(argv.id && argv.type && argv.level && argv.ins) {
        const edu = new StudentEQ({
            type: argv.type,
            department: argv.dept,
            group: argv.group,
            institute: argv.ins,
            level: argv.level,
            term: argv.term
        });
        try {
            const education = await createStudentEdu(argv.id, edu);
            printObject(education);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log("Give valid arguments");
    }
})();
