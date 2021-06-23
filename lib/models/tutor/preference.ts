import Schedule from "../utils/schedule";
import Remuneration from "../utils/remuneration";
import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {PreferenceAliases} from "../../data-layer/utils/aliases";
import Location from "../utils/location";

interface ConstructorParams {
    gender: string;
    country: string;
    locations: Location[]
    schedule: Schedule;
    remunerations: Remuneration[];
}

export default class Preference {
    gender: string;
    country: string;
    locations: Location[];
    schedule: Schedule;
    remunerations: Remuneration[];


    constructor({gender, country, locations, schedule, remunerations}: ConstructorParams) {
        this.gender = gender;
        this.country = country;
        this.locations = locations;
        this.schedule = schedule;
        this.remunerations = remunerations;
    }

    mapToAlias() {
        let rems = [];
        let locs = [];
        for(const rem of this.remunerations) {
            rems.push(rem.mapToAlias());
        }
        for(const loc of this.locations) {
            locs.push(loc.mapToAlias());
        }
        return {
            ...mapItemToAlias(PreferenceAliases, this),
            [PreferenceAliases.remunerations]: rems,
            [PreferenceAliases.locations]: locs,
            [PreferenceAliases.schedule]: this.schedule.mapToAlias()
        };
    }

    static mapFromAlias(item): Preference{
        let rems: Remuneration[] = [];
        let locs: Location[] = [];
        for(const rem of item[PreferenceAliases.remunerations]) {
            rems.push(Remuneration.mapFromAlias(rem));
        }
        for(const loc of item[PreferenceAliases.locations]) {
            locs.push(Location.mapFromAlias(loc));
        }
        return new Preference({
            country: undefined, gender: undefined,
            ...mapItemFromAlias(PreferenceAliases, item),
            schedule: Schedule.mapFromAlias(item[PreferenceAliases.schedule]),
            remunerations: rems,
            locations: locs
        })
    }
}