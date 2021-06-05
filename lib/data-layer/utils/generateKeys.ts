export function genUserPK(userId: string) {
    return {
        PK: "UID#" + userId,
        SK: "UID#" + userId,
    }
}

export function genUserGSI1PK(email: string) {
    return {
        GSI1PK: "EMAIL#" + email,
        GSI1SK: "EMAIL#" + email,
    }
}

export function genUserGSI2PK(mobileNumber: string) {
    return {
        GSI2PK: "MOBILE#" + mobileNumber,
        GSI2SK: "MOBILE#" + mobileNumber,
    }
}

export function genStudentEduPK(id: string) {
    return {
        PK: "UID#" + id,
        SK: "EDU#"
    }
}

export function genTutorPK(id: string) {
    return {
        PK: "UID#" + id,
        SK: "TUTOR"
    }
}

export function genTutorShortPK(id: string, tuitionType: string) {
    return {
        PK: 'UID#' + id,
        SK: '#TUTOR#T#' + tuitionType
    }
}

export function genTutorEduPK(id: string, degree: string) {
    return {
        PK: "UID#" + id,
        SK: "TUTOR#EDU#" + degree
    }
}

export function genTutorPrefPK(id: string) {
    return {
        PK: "UID#" + id,
        SK: "TUTOR#PREF#" + id
    }
}

export interface GenShortTutorGSI1PKParams {
    enabled: boolean;
    verified: boolean;
    country: string;
    district: string;
    institute: string;
    tuitionType: string;
    userId: string;
}

export function genShortTutorGSI1PK({enabled, verified, country, district, institute, tuitionType, userId}: GenShortTutorGSI1PKParams) {
    return {
        GSI1PK: "EN#" + enabled + "#VR#" + verified + "#CN#" + country + "#DIS#" + district + "#T#" + tuitionType,
        GSI1SK:  "INS#" + institute  + "#" + userId
    }
}

interface GenTutorGSI1PKParams {
    enabled: boolean;
    verified: boolean;
    institute: string;
    rating: Number;
    userId: string;
}

export function genTutorGSI1PK({enabled, verified, institute, rating, userId}: GenTutorGSI1PKParams) {
    return {
        GSI1PK: "EN#" + enabled + "#VR#" + verified + "#INS#" + institute,
        GSI1SK: "RT#" + rating + "#" + userId
    }
}