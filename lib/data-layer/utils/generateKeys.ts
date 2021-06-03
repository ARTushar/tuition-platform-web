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
        SK: "TUTOR#" + id
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

interface GenTutorGSI1PKParams {
    enabled: boolean;
    verified: boolean;
    country: string;
    district: string;
    upazilla: string;
    area: string;
    tuitionType: string;
    institute: boolean;
    userId: string;
}

export function genTutorGSI1PK({enabled, verified, country, district, upazilla, area, tuitionType, institute, userId}: GenTutorGSI1PKParams) {
    return {
        GSI1PK: "EN#" + enabled + "#VER#" + verified + "#CN#" + country + "#DIS#" + district + "#UZ#" + upazilla + "#AR#" + area + "#T#" + tuitionType,
        GSI1SK: "INS#" + institute + "#" + userId
    }
}

interface GenTutorGSI2PKParams {
    enabled: boolean;
    verified: boolean;
    country: string;
    district: string;
    upazilla: string;
    area: string;
    tuitionType: string;
    gender: string;
    institute: boolean;
    userId: string;
}

export function genTutorGSI2PK({enabled, verified, country, district, upazilla, area, tuitionType, gender, institute, userId}: GenTutorGSI2PKParams) {
    return {
        GSI2PK: "EN#" + enabled + "#VER#" + verified + "#CN#" + country + "#DIS#" + district + "#UZ#" + upazilla + "#AR#" + area + "#T#" + tuitionType + "#GEN#" + gender,
        GSI2SK: "INS#" + institute + "#" + userId
    }
}

interface GenTutorGSI3PKParams {
    enabled: boolean;
    verified: boolean;
    tuitionType: string;
    institute: string;
    rating: Number;
    userId: string;
}

export function genTutorGSI3PK({enabled, verified, tuitionType, institute, rating, userId}: GenTutorGSI3PKParams) {
    return {
        GSI3PK: "EN#" + enabled + "#VER#" + verified + "#T#" + tuitionType + "#INS#" + institute,
        GSI3SK: "RT#" + rating + "#" + userId
    }
}