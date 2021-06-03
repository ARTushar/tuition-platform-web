import Schedule from "../../utils/schedule";
import Remuneration from "../../utils/remuneration";

interface ConstructorParams {
    gender: string;
    locations: Location[];
    schedule: Schedule;
    remunerations: Remuneration[];
}

export default class Preference {
    gender: string;
    locations: Location[];
    schedule: Schedule;
    remunerations: Remuneration[];


    constructor({gender, locations, schedule, remunerations}: ConstructorParams) {
        this.gender = gender;
        this.locations = locations;
        this.schedule = schedule;
        this.remunerations = remunerations;
    }
}