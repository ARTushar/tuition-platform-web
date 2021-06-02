interface ConstructorParams {
    degree: string;
    medium: string;
    department: string;
    group: string;
    institute: string;
    level: number;
    term: number;
}

export default class TutorEQ implements Education {
    degree: string;
    medium?: string;
    department?: string;
    group?: string;
    institute: string;
    level?: number;
    term?: number;


    constructor({degree, medium, department, group, institute, level, term}: ConstructorParams) {
        this.degree = degree;
        this.medium = medium;
        this.department = department;
        this.group = group;
        this.institute = institute;
        this.level = level;
        this.term = term;
    }
}