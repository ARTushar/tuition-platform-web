import TutorEQ from "../../models/user/tutor/tutorEQ";
import {VideoLink} from "../../models/utils/videoLink";
import Preference from "../../models/user/tutor/preference";

export const UserAliases = {
    id: 'id',
    name: 'na',
    email: 'em',
    emailVerified: 'emv',
    accountType: 'at',
    mobileNumber: 'mn',
    profilePicture: 'pp',
    gender: 'gn',
    createdAt: 'ca',
    updatedAt: 'ua',
}
export const StudentEduAliases = {
    type: 'tp',
    department: 'dept',
    group: 'gr',
    institute: 'in',
    level: 'le',
    term: 'te'
}

export const TutorEQAliases = {
    degree: 'deg',
    department: 'dep',
    group: 'gr',
    institute: 'in',
    level: 'le',
    term: 'te'
}

export const PreferenceAliases = {
    gender: 'gn',
    locations: 'loc',
    schedule: 'sc',
    remunerations: 'rem'
}

export const TutorAliases = {
    id: 'id',
    name: 'na',
    email: 'em',
    emailVerified: 'emv',
    accountType: 'at',
    mobileNumber: 'mn',
    profilePicture: 'pp',
    gender: 'gn',
    createdAt: 'ca',
    updatedAt: 'ua',
    educationQualifications: 'eqs',
    introVideoLink: 'ivl',
    demoVideoLinks: 'dml',
    introText: 'it',
    preference: 'pr'
}

export const StudentAliases = {
    id: 'id',
    name: 'na',
    email: 'em',
    emailVerified: 'emv',
    accountType: 'at',
    mobileNumber: 'mn',
    profilePicture: 'pp',
    gender: 'gn',
    createdAt: 'ca',
    updatedAt: 'ua',
    education: 'ed'
}

export const AddressAliases = {
    country: 'cn',
    district: 'dis',
    upazilla: 'up',
    area: 'ar',
    ward: 'wa',
    postalCode: 'pc'
}

export const LocationAliases = {
    country: 'cn',
    district: 'dis',
    upazilla: 'up',
    area: 'ar'
}

export const ScheduleAliases = {
    saturday: 'sa',
    sunday: 'su',
    monday: 'mo',
    tuesday: 'tu',
    wednesday: 'we',
    thursday: 'th',
    friday: 'fr'
}

export const VideoLinkAliases = {
    title: 'ti',
    subject: 's',
    videoLink: 'vl'
}

export const RemunerationType = {
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    ssc: 'ssc',
    hsc: 'hsc',
    admission: 'adm',
    undergraduate: 'ug',
}

export const StudentEduType = {
    primary: 'pr',
    secondary: 'sr',
    higherSecondary: 'hsr',
    undergraduate: 'ug'
}

export const TutorDegreeType = {
    secondary: 'sr',
    higherSecondary: 'hsr',
    undergraduate: 'ug',
    postgraduate: 'pg',
}

export const EducationMediumType = {
    bangla: 'bn',
    english: 'en',
    both: 'bo'
}


export const accountType = {
    student: 'st',
    tutor: 'tu',
    moderator: 'mo',
    admin: 'ad'
}