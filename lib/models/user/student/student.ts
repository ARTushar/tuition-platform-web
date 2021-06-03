import User from "../user";
import StudentEQ from "./studentEQ";
import {mapItemToAlias} from "../../../data-layer/utils/utils";
import {StudentAliases} from "../../../data-layer/utils/aliases";


interface ConstructorParams {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    accountType: string;
    mobileNumber: string;
    profilePicture: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
    education: StudentEQ;
}

export default class Student extends User {
    education: StudentEQ;


    constructor({id, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, createdAt, updatedAt, education}: ConstructorParams) {
        super({id, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, createdAt, updatedAt});
        this.education = education;
    }

    mapToAlias() {
        return mapItemToAlias(StudentAliases, this);
    }

}