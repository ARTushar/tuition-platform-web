interface ConstructorParams {
    type: string;
    subjects: Set<string>;
    from: number;
    to: number;
}

export default class Remuneration {
    type: string;
    subjects: Set<string>;
    from: number;
    to: number;


    constructor({type, subjects, from, to}: ConstructorParams) {
        this.type = type;
        this.subjects = subjects;
        this.from = from;
        this.to = to;
    }
}