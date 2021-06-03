export function generateUserPrimaryKeys(userId: string) {
    return {
        PK: "UID#" + userId,
        SK: "UID#" + userId,
    }
}

export function generateUserGSI1Keys(email: string) {
    return {
        GSI1PK: "EMAIL#" + email,
        GSI1SK: "EMAIL#" + email,
    }
}

export function generateUserGSI2Keys(mobileNumber: string) {
    return {
        GSI2PK: "MOBILE#" + mobileNumber,
        GSI2SK: "MOBILE#" + mobileNumber,
    }
}
