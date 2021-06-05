import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {UserAliases} from "../../data-layer/utils/aliases";
import Address from "../utils/address";

interface ConstructorParams {
    id?: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    accountType: string;
    mobileNumber: string;
    gender?: string;
    profilePicture?: string;
    address?: Address;
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
    address: Address


    constructor({id, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, address}: ConstructorParams) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.emailVerified = emailVerified;
        this.accountType = accountType;
        this.mobileNumber = mobileNumber;
        this.profilePicture = profilePicture;
        this.gender = gender;
        this.address = address;
    }

    mapToAlias() {
        return {
            ...mapItemToAlias(UserAliases, this),
            [UserAliases.address]: this.address.mapToAlias()
        };
    }

    static mapFromAlias(item): User {
        return new User({
            accountType: undefined, email: undefined, emailVerified: undefined,
            gender: undefined, id: undefined, mobileNumber: undefined, name: undefined,
            profilePicture: undefined,
            ...mapItemFromAlias(UserAliases, item),
            address: Address.mapFromAlias(item[UserAliases.address])
        });
    }
}