#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import {getAllTutors} from "../../data-layer/entities/tutor/getTutor";

const argv = generateArgv();

(async ()=> {
    try {
        const tutors = await getAllTutors();
        printObject(tutors);
    } catch(e){
        console.log(e);
    }
})();
