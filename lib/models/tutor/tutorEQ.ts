import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {StudentEduAliases, TutorEQAliases} from "../../data-layer/utils/aliases";
import {Education} from "../utils/education";

interface ConstructorParams {
    degree: string;
    medium?: string;
    department?: string;
    group?: string;
    institute: string;
    level?: number;
    term?: number;
}

export default class TutorEQ implements Education {
    degree: string;
    medium: string;
    department: string;
    group: string;
    institute: string;
    level: number;
    term: number;
    createdAt: string;
    updatedAt: string;


    constructor({degree, medium, department, group, institute, level, term}: ConstructorParams) {
        this.degree = degree;
        this.medium = medium;
        this.department = department;
        this.group = group;
        this.institute = institute;
        this.level = level;
        this.term = term;
    }

    mapToAlias() {
        return mapItemToAlias(TutorEQAliases, this);
    }

    static mapFromAlias(item): TutorEQ {
        return new TutorEQ({
            medium: undefined, department: undefined, group: undefined, institute: undefined, level: undefined, term: undefined, degree: undefined,
            ...mapItemFromAlias(TutorEQAliases, item)
        })
    }

    static constructFactory(edu): TutorEQ {
        return new TutorEQ({
            degree: edu.degree,
            medium: edu.medium,
            department: edu.department,
            group: edu.group,
            institute: edu.institute,
            level: edu.level,
            term: edu.term
        });
    }
}