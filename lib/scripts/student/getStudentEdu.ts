#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import {getStudentEdu} from "../../data-layer/entities/student/getStudentEdu";

const argv = generateArgv();

(async ()=> {
    if(argv.id) {
        try {
            const education = await getStudentEdu(argv.id);
            printObject(education);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
