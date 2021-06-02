import User from "../user";
import StudentEQ from "./studentEQ";


interface ConstructorParams {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
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
}