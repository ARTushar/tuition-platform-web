import Remuneration from "../utils/remuneration";
import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {ShortTutorAliases} from "../../data-layer/utils/aliases";
import {getAllTutors, getTutorsByLoTypeClassGenSub} from "../../data-layer/entities/tutor/getTutor";

interface ConstructorParams {
    userId?: string;
    enabled?: boolean;
    verified?: boolean;
    name?: string;
    gender?: string;
    profilePicture?: string;
    ugInstitute?: string;
    ugDepartment?: string;
    rating?: number;
    country?: string;
    district?: string;
    areas?: string[];
    remuneration?: Remuneration;
}

export default class ShortTutor {
    userId: string;
    enabled: boolean;
    verified: boolean;
    name: string;
    gender: string;
    profilePicture: string;
    ugInstitute: string;
    ugDepartment: string;
    rating: number;
    country: string;
    district: string;
    areas: string[];
    remuneration: Remuneration


    constructor({userId, enabled, verified, name, gender, profilePicture, ugInstitute, ugDepartment, rating, country, district, areas, remuneration}: ConstructorParams) {
        this.userId = userId;
        this.enabled = enabled;
        this.verified = verified;
        this.name = name;
        this.gender = gender;
        this.profilePicture = profilePicture;
        this.ugInstitute = ugInstitute;
        this.ugDepartment = ugDepartment;
        this.rating = rating;
        this.country = country;
        this.district = district;
        this.areas = areas;
        this.remuneration = remuneration;
    }

    mapToAlias() {
        return {
            ...mapItemToAlias(ShortTutorAliases, this),
            [ShortTutorAliases.remuneration]: this.remuneration.mapToAlias()
        };
    }

    static mapFromAlias(item): ShortTutor {
        return new ShortTutor({
            areas: undefined, country: undefined, district: undefined, enabled: undefined,
            gender: undefined, name: undefined, profilePicture: undefined, rating: undefined,
            ugDepartment: undefined, ugInstitute: undefined, userId: undefined, verified: undefined,
            ...mapItemFromAlias(ShortTutorAliases, item),
            remuneration: item[ShortTutorAliases.remuneration]? Remuneration.mapFromAlias(item[ShortTutorAliases.remuneration]): undefined
        })
    }

    static async getTutors(query) {
        try {
            return await getTutorsByLoTypeClassGenSub({
                enabled: true,
                verified: true,
                country: 'Bangladesh',
                ...query
            });
        } catch (e) {
            throw e;
        }
    }

    static async getAllTutors() {
        try {
            return await getAllTutors();
        } catch (e) {
            throw e;
        }
    }
}