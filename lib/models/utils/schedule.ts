import {FreeTime} from "./freeTime";
import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {ScheduleAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    saturday?: string[];
    sunday?: string[];
    monday?: string[];
    tuesday?: string[];
    wednesday?: string[];
    thursday?: string[];
    friday?: string[];
}

export default class Schedule {
    saturday: string[];
    sunday: string[];
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];


    constructor({saturday, sunday, monday, tuesday, wednesday, thursday, friday}: ConstructorParams) {
        this.saturday = saturday;
        this.sunday = sunday;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
    }

    mapToAlias() {
        return mapItemToAlias(ScheduleAliases, this);
    }
    static mapFromAlias(item) {
        return new Schedule(mapItemFromAlias(ScheduleAliases, item));
    }
}