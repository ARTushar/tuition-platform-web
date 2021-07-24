import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {StudentEduAliases} from "../../data-layer/utils/aliases";
import {Education} from "../utils/education";

interface ConstructorParams {
    type: string;
    department: string;
    group: string;
    institute: string;
    level: number;
    term: number;
}

export default class StudentEQ implements Education{
    type: string;
    department?: string;
    group?: string;
    institute: string;
    level?: number;
    term?: number;
    createdAt: string;
    updatedAt: string;

    constructor({type, department, group, institute, level, term}: ConstructorParams) {
        this.type = type;
        this.department = department;
        this.group = group;
        this.institute = institute;
        this.level = level;
        this.term = term;
    }

    mapToAlias() {
        return mapItemToAlias(StudentEduAliases, this);
    }

    static mapFromAlias(item): StudentEQ {
        return new StudentEQ({
            department: undefined, group: undefined, institute: undefined, level: undefined, term: undefined, type: undefined,
            ...mapItemFromAlias(StudentEduAliases, item)
        })
    }

    static constructFactory(edu): StudentEQ {
        return new StudentEQ({
            type: edu.type,
            department: edu.department,
            group: edu.group,
            institute: edu.institute,
            level: edu.level,
            term: edu.term
        });
    }
}
