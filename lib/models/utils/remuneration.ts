import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {RemunerationAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    type: string;
    subjects: string[];
    from: number;
    to: number;
}

export default class Remuneration {
    type: string;
    subjects: string[];
    from: number;
    to: number;


    constructor({type, subjects, from, to}: ConstructorParams) {
        this.type = type;
        this.subjects = subjects;
        this.from = from;
        this.to = to;
    }

    mapToAlias() {
        return mapItemToAlias(RemunerationAliases, this)
    }

    static mapFromAlias(item): Remuneration {
        return new Remuneration({
            from: undefined, subjects: undefined, to: undefined, type: undefined,
            ...mapItemFromAlias(RemunerationAliases, item)
        })
    }
}