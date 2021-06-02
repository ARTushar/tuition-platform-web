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
}

export default class User {
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


    constructor({id, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, createdAt, updatedAt}: ConstructorParams) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.emailVerified = emailVerified;
        this.accountType = accountType;
        this.mobileNumber = mobileNumber;
        this.profilePicture = profilePicture;
        this.gender = gender;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}