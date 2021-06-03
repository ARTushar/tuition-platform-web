#!/usr/bin/env ts-node

import {generateArgv} from '../utils/utils';
import StudentEQ from "../../models/student/studentEQ";
import updateStudentEdu from "../../data-layer/entities/student/updateStudentEdu";

const argv = generateArgv();

(async ()=> {
    if(argv.id) {
        const edu = new StudentEQ({
            type: argv.type,
            department: argv.dept,
            group: argv.group,
            institute: argv.ins,
            level: argv.level,
            term: argv.term
        });
        try {
            const updated = await updateStudentEdu(argv.id, edu);
            console.log('updated: ', updated)
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
