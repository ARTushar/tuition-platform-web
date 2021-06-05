import Remuneration from "../utils/remuneration";
import {mapItemToAlias} from "../../data-layer/utils/utils";
import {ShortTutorAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
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
    areas: Set<string>;
    remuneration: Remuneration;
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
    areas: Set<string>;
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
        return mapItemToAlias(ShortTutorAliases, this);
    }
}