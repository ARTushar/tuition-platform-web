import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {UserAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    accountType: string;
    mobileNumber: string;
    gender?: string;
    profilePicture?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class User {
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

    mapToAlias() {
        return mapItemToAlias(UserAliases, this);
    }

    static mapFromAlias(item): User {
        return new User({
            accountType: undefined, createdAt: undefined, email: undefined, emailVerified: undefined,
            gender: undefined, id: undefined, mobileNumber: undefined, name: undefined,
            profilePicture: undefined, updatedAt: undefined,
            ...mapItemFromAlias(UserAliases, item)
        });
    }
}