import {FreeTime} from "./freeTime";

interface ConstructorParams {
    saturday?: FreeTime[];
    sunday?: FreeTime[];
    monday?: FreeTime[];
    tuesday?: FreeTime[];
    wednesday?: FreeTime[];
    thursday?: FreeTime[];
    friday?: FreeTime[];
}

export default class Schedule {
    saturday: FreeTime[];
    sunday: FreeTime[];
    monday: FreeTime[];
    tuesday: FreeTime[];
    wednesday: FreeTime[];
    thursday: FreeTime[];
    friday: FreeTime[];


    constructor({saturday, sunday, monday, tuesday, wednesday, thursday, friday}: ConstructorParams) {
        this.saturday = saturday;
        this.sunday = sunday;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
    }
}