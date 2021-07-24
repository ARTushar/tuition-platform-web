import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {RemunerationAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    studentType: string;
    studentClass: string;
    subjects: string[];
    from: number;
    to: number;
}

export default class Remuneration {
    studentType: string;
    studentClass: string;
    subjects: string[];
    from: number;
    to: number;


    constructor({studentType, studentClass, subjects, from, to}: ConstructorParams) {
        this.studentType = studentType;
        this.subjects = subjects;
        this.studentClass = studentClass;
        this.from = from;
        this.to = to;
    }

    mapToAlias() {
        return mapItemToAlias(RemunerationAliases, this);
    }

    static mapFromAlias(item): Remuneration {
        return new Remuneration({
            studentClass: undefined, from: undefined, subjects: undefined, to: undefined, studentType: undefined,
            ...mapItemFromAlias(RemunerationAliases, item)
        })
    }

    static constructFactory(remuneration): Remuneration {
        return new Remuneration({
            studentClass: remuneration.studentClass,
            studentType: remuneration.studentType,
            subjects: remuneration.subjects,
            from: remuneration.from,
            to: remuneration.to
        });
    }
}