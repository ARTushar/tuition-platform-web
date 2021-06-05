import {getKeys} from "./helpers";
import {
    AccountType,
    EducationDegree,
    Gender,
    GenderPref, RemunerationType,
    ScheduleAliases,
    ScheduleType
} from "../data-layer/utils/aliases";

export const ConstantEnums = {
    gender: getKeys(Gender),
    genderPref: getKeys(GenderPref),
    educationDegree: getKeys(EducationDegree),
    accountType: getKeys(AccountType),
    days: getKeys(ScheduleAliases),
    schedules: getKeys(ScheduleType),
    tuitionType: getKeys(RemunerationType)
}
