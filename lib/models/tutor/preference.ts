import Schedule from "../utils/schedule";
import Remuneration from "../utils/remuneration";
import {mapItemToAlias} from "../../data-layer/utils/utils";
import {PreferenceAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    gender: string;
    country: string;
    district: string;
    areas: Set<string>;
    schedule: Schedule;
    remunerations: Remuneration[];
}

export default class Preference {
    gender: string;
    country: string;
    district: string;
    areas: Set<string>;
    schedule: Schedule;
    remunerations: Remuneration[];


    constructor({gender, country, district, areas, schedule, remunerations}: ConstructorParams) {
        this.gender = gender;
        this.country = country;
        this.district = district;
        this.areas = areas;
        this.schedule = schedule;
        this.remunerations = remunerations;
    }

    mapToAlias() {
        return mapItemToAlias(PreferenceAliases, this);
    }
}