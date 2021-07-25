import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {RequestAliases} from "../../data-layer/utils/aliases";
import {getStudentRequests, getTutorRequests} from "../../data-layer/request/getRequest";
import createRequest from "../../data-layer/request/createRequest";
import updateRequest from "../../data-layer/request/updateRequest";

interface ConstructorParams {
    requestId?: string;
    tutorId: string;
    studentId: string;
    country: string;
    district: string;
    area: string;
    gender: string;
    version: string;
    studentClass: string;
    subjects: string[];
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class Request {
    requestId: string;
    tutorId: string;
    studentId: string;
    country: string;
    district: string;
    area: string;
    gender: string;
    version: string;
    studentClass: string;
    subjects: string[];
    status: string;
    createdAt: string;
    updatedAt: string;


    constructor({requestId, tutorId, studentId, country, district, area, gender, version, studentClass, subjects, status, createdAt, updatedAt}: ConstructorParams) {
        this.requestId = requestId;
        this.tutorId = tutorId;
        this.studentId = studentId;
        this.country = country;
        this.district = district;
        this.area = area;
        this.gender = gender;
        this.version = version;
        this.studentClass = studentClass;
        this.subjects = subjects;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static constructFactory(request): Request {
        return new Request({
            requestId: request.requestId,
            tutorId: request.tutorId,
            studentId: request.studentId,
            country: request.country,
            district: request.district,
            area: request.area,
            gender: request.gender,
            version: request.version,
            studentClass: request.studentClass,
            subjects: request.subjects,
            status: request.status,
            createdAt: request.createdAt,
            updatedAt: request.updatedAt
        });
    }

    mapToAlias() {
        return mapItemToAlias(RequestAliases, this);
    }

    static mapFromAlias(item): Request {
        return this.constructFactory(mapItemFromAlias(RequestAliases, item));
    }


    static async getTutorRequests(tutorId: string) {
        try {
            return await getTutorRequests(tutorId);
        } catch (e) {
            throw e;
        }
    }

    static async getStudentRequests(studentId: string) {
        try {
            return await getStudentRequests(studentId);
        } catch (e) {
            throw e;
        }
    }

    static async create(request) {
        try {
            return await createRequest(Request.constructFactory(request));
        } catch (e) {
            throw e;
        }
    }

    static async updateStatus(studentId, tutorId, status) {
        try {
            return await updateRequest(studentId, tutorId, status);
        } catch (e) {
            throw e;
        }
    }
}