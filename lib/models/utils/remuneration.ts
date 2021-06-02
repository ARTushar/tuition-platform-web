export default class Remuneration {
    type: string;
    from: number;
    to: number;


    constructor(type: string, from: number, to: number) {
        this.type = type;
        this.from = from;
        this.to = to;
    }
}