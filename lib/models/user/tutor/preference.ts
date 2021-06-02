import Schedule from "../../utils/schedule";
import Remuneration from "../../utils/remuneration";

export default class Preference {
    gender: string;
    locations: Location[];
    schedule: Schedule;
    remunerations: Remuneration[];
}