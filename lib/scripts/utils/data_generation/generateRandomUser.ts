import {
    generateRandomEmail,
    generateRandomMobileNumber,
    generateRandomNameFromDict, getKeys,
    getRandomEnumValue, getRandomInt
} from '../utils';
import User from "../../../models/user/user";
import { ConstantEnums } from '../../../utils/enums';
import Address from "../../../models/utils/address";
import areas from "../../../files/areas.json";

export function generateRandomUser() {
    return new User({
        name: generateRandomNameFromDict(),
        mobileNumber: generateRandomMobileNumber(),
        email: generateRandomEmail(),
        accountType: getRandomEnumValue(['student', 'tutor']),
        gender: getRandomEnumValue(ConstantEnums.gender),
        address: generateRandomAddress()
    })
}

export function generateRandomAddress(): Address {
    const districts = getKeys(areas);
    const disIndex = getRandomInt(districts.length);
    const district = districts[disIndex];
    const area = areas[district][getRandomInt(areas[district].length)];

    return new Address({
        country: "Bangladesh",
        district,
        area
    })
}
