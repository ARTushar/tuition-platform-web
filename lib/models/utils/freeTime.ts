interface ConstructorParams {
    from: string;
    to: string;
}

export class FreeTime {
    from: string;
    to: string;


    constructor({from, to}: ConstructorParams) {
        this.from = from;
        this.to = to;
    }
}