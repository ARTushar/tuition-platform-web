import StudentEQ from "./studentEQ";
import {mapItemToAlias} from "../../data-layer/utils/utils";
import {StudentAliases} from "../../data-layer/utils/aliases";


interface ConstructorParams {
    userId: string;
    education: StudentEQ;
}

export default class Student {
    userId: string;
    education: StudentEQ;

    constructor({userId, education}: ConstructorParams) {
        this.userId = userId;
        this.education = education;
    }

    mapToAlias() {
        return mapItemToAlias(StudentAliases, this);
    }

}