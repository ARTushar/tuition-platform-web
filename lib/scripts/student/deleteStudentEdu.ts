#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import deleteStudentEdu from "../../data-layer/entities/student/deleteStudentEdu";

const argv = generateArgv();

(async ()=> {
    if(argv.id) {
        try {
            const deleted  = await deleteStudentEdu(argv.id);
            console.log('Deleted:', deleted);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
