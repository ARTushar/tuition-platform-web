import StudentEQ from "./studentEQ";
import {mapItemToAlias} from "../../data-layer/utils/utils";
import {StudentAliases} from "../../data-layer/utils/aliases";
import createStudentEdu from "../../data-layer/entities/student/createStudentEdu";
import {getStudentEdu} from "../../data-layer/entities/student/getStudentEdu";
import updateStudentEdu from "../../data-layer/entities/student/updateStudentEdu";


interface ConstructorParams {
    userId: string;
    education: StudentEQ;
}

export default class Student {
    userId: string;
    education: StudentEQ;

    constructor({userId, education}: ConstructorParams) {
        this.userId = userId;
        this.education = education;
    }

    mapToAlias() {
        return mapItemToAlias(StudentAliases, this);
    }

    static constructFactory(student): Student {
        return new Student({
            userId: student.user,
            education: StudentEQ.constructFactory(student.education)
        });
    }

    static async create(userId, education): Promise<Student> {
        try {
            const studentEdu = await createStudentEdu(userId, StudentEQ.constructFactory(education));
            return new Student({userId, education: studentEdu});
        } catch (e) {
            throw e;
        }
    }

    static async get(userId) {
        try {
            const studentEdu = await getStudentEdu(userId);
            return new Student({userId, education: studentEdu});
        } catch (e) {
            throw e;
        }
    }

    static async update(userId, edu) {
        try {
            const studentEdu = await updateStudentEdu(userId, StudentEQ.constructFactory(edu));
            return new Student({userId, education: StudentEQ.constructFactory(edu)});
        } catch (e) {
            throw e;
        }
    }
}