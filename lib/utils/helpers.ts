import KSUID from 'ksuid';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { createHash } from 'crypto';


export function getKeys(type) {
    return Object.keys(type);
}

export const titleCase = (name) =>
    name
        .trim()
        .toLowerCase()
        .split(/[ \t]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

export const addCountryCode = (num) => {
    if (num.search(/^[+]880[0-9]{10}/) !== -1) {
        return num;
    } else if (num.search(/^880[0-9]{10}/) !== -1) {
        return "+" + num;
    } else if (num.search(/^0[0-9]{10}/) !== -1) {
        // console.log(num);
        return "+88" + num;
    } else {
        return num;
    }
};

export function errorFactory(error, errorCreator) {
    return error.status ? error: errorCreator(error.message);
}

export async function generateID(): Promise<string> {
    const resp = await KSUID.random();
    return resp.string;
}

export function generateSessionToken(): string {
    return uuidv4();
}

export function addDays(date: Date, day: number): Date {
    return new Date(date.getTime() + day * 24 * 60 * 60 * 1000);
}

export function checkValidMobileNumber(value, helpers) {
    if(!validator.isMobilePhone(value, 'any', {strictMode: true})){
        return helpers.message(value + ": invalid mobile number");
    }
    return value;
}

export function checkValidEmail(value, helpers) {
    if(!validator.isEmail(value, )){
        return helpers.error("invalid email");
    }
    return value;
}

export function generateVRToken(token: string, secret: string){
    return createHash("sha256")
        .update(`${token}${secret}`)
        .digest("hex");
}


export function debug(debugCode, ...args) {
    console.debug(`${debugCode}`, ...args)
}

export function objStringify(ob) {
    try {
        return JSON.stringify(ob, null, 2);
    } catch (e) {
        throw e;
    }
}

export function isEqual(obja, objb): boolean {
    const typeA = typeof obja;
    const typeB = typeof objb;
    console.assert(typeA === typeB);
    for(const key of Object.keys(obja)) {
        if(typeof obja[key] === 'object') {
            if(!obja[key].isEqual(objb[key])) {
                return false;
            }
            continue;
        }
        if(obja[key] !== objb[key]) return false;
    }
    return true;
}

export function deleteSameFields(oldObject, newObject, keeps) {
    console.assert(typeof oldObject === typeof newObject);
    for(const key of Object.keys(oldObject)) {
        if(keeps.includes(key)) continue;
        if(typeof newObject[key] === 'object' && typeof oldObject[key] === 'object') {
            deleteSameFields(oldObject[key], newObject[key], keeps);
        } else if(newObject[key] === oldObject[key]) {
            delete newObject[key];
        }
    }
}

export function deleteGivenFields(obj, fields) {
    for(const key of getKeys(obj)) {
        if(fields.includes(key)) delete obj[key];
    }
}

export function isEqualDeep(obja, objb) {
    console.assert(typeof obja === typeof objb);
    for(const key of Object.keys(obja)) {
        if(typeof obja[key] === 'object') {
            const status = isEqualDeep(obja[key], objb[key]);
            if (!status) return false;
        } else if(obja[key] !== objb[key]) {
            return false;
        }
    }
    return true;
}

export function genRxFmEnVals(values): RegExp {
    return new RegExp('^('+values.join('|')+')$');
}
