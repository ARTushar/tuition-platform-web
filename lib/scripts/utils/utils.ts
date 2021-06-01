export function printObject(obj) {
    console.log(JSON.stringify(obj, null, 2))
}

export function generateArgv() {
    const yargs = require('yargs/yargs');
    const { hideBin } = require('yargs/helpers');
    return yargs(hideBin(process.argv)).argv
}

export function getKeys(type) {
    return Object.keys(type);
}

export function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function generateRandomStringChars(length: number, characters: string): string {
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
          characters.length)));
    }
    return result.join('');
}

export function generateRandomString(length: number): string {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return generateRandomStringChars(length, characters);
}

export function generateRandomMobileNumber(totalDigits:number = 11): string {
    let number = '';
    for(let i = 0; i < totalDigits; i++) {
        number += getRandomInt(10).toString();
    }
    return number;
}

export function generateRandomName(length=10): string {
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    return generateRandomStringChars(length, characters);
}

export function generateRandomEmail(length=10): string {
    let email = generateRandomString(length);
    return email + '@gmail.com';
}

export function generateRandomBoolean() {
    return !!getRandomInt(2);
}

export function getRandomEnumValue(values) {
    return values[getRandomInt(values.length)];
}
