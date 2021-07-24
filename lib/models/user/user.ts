import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {UserAliases} from "../../data-layer/utils/aliases";
import Address from "../utils/address";
import {getUserByEmailPass, getUserById} from "../../data-layer/entities/user/getUser";
import createUser from "../../data-layer/entities/user/createUser";
import {updateUser} from "../../data-layer/entities/user/updateUser";

interface ConstructorParams {
    id?: string;
    hash?: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    accountType: string;
    mobileNumber: string;
    gender?: string;
    profilePicture?: string;
    address?: Address;
}

interface User1 {
    name: string;
    email: string;
    mobileNumber: string;
    accountType: any;
    password: string;
    gender: string;
    country: string;
    district: string;
    area: string;
}

export default class User {
    id: string;
    hash: string;
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


    constructor({id, hash, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, address}: ConstructorParams) {
        this.id = id;
        this.hash = hash;
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

    static constructFactory(user) {
        return new User({
            id: user.id,
            hash: user.hash,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            accountType: user.accountType,
            mobileNumber: user.mobileNumber,
            profilePicture: user.profilePicture,
            gender: user.gender,
            address: Address.constructFactory(user.address)
        })
    }

    static async verifyUser(email: string, password: string): Promise<User> {
        try {
            return await getUserByEmailPass(email, password);
        } catch (e) {
            throw e;
        }
    }

    static async createUser({name, email, mobileNumber, accountType, password, gender, country, district, area}: User1): Promise<User> {
        try {
            let user = await createUser(new User({
                name,
                email,
                emailVerified: false,
                accountType,
                mobileNumber,
                gender,
                address: new Address({
                    country,
                    district,
                    area
                })
            }), password);
            delete user.hash;
            return user;
        } catch (e) {
            throw e;
        }
    }

    static async updateUser(user) {
        try {
            let user = await updateUser(User.constructFactory(user));
            delete user.hash;
            return user;
        } catch (e) {
            throw e;
        }
    }

    static async getUserById(id: string) {
        try {
            let user = await getUserById(id);
            delete user.hash;
            return user;
        } catch (e) {
            throw e;
        }
    }
}