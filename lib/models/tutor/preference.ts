import Schedule from "../utils/schedule";
import Remuneration from "../utils/remuneration";
import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {PreferenceAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    gender: string;
    country: string;
    district: string;
    areas: string[];
    schedule: Schedule;
    remunerations: Remuneration[];
}

export default class Preference {
    gender: string;
    country: string;
    district: string;
    areas: string[];
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
        let rems = []
        for(const rem of this.remunerations) {
            rems.push(rem.mapToAlias())
        }
        return {
            ...mapItemToAlias(PreferenceAliases, this),
            [PreferenceAliases.remunerations]: rems,
            [PreferenceAliases.schedule]: this.schedule.mapToAlias()
        };
    }

    static mapFromAlias(item): Preference{
        let rems: Remuneration[] = [];
        for(const rem of item[PreferenceAliases.remunerations]) {
            rems.push(Remuneration.mapFromAlias(rem))
        }
        return new Preference({
            areas: undefined, country: undefined, district: undefined, gender: undefined,
            ...mapItemFromAlias(PreferenceAliases, item),
            schedule: Schedule.mapFromAlias(item[PreferenceAliases.schedule]),
            remunerations: rems
        })
    }
}