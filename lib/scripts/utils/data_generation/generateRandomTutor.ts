import Tutor from "../../../models/tutor/tutor";
import User from "../../../models/user/user";
import {getRandomEnumValue, getRandomInt} from "../utils";
import randomParams  from '../../../files/random-params.json';
import Address from "../../../models/utils/address";
import {ConstantEnums} from "../../../utils/enums";
import TutorEQ from "../../../models/tutor/tutorEQ";
import Preference from "../../../models/tutor/preference";
import Schedule from "../../../models/utils/schedule";
import Remuneration from "../../../models/utils/remuneration";
import Areas from '../../../files/areas.json';
import {debug} from "../../../utils/helpers";


export function generateRandomTutor(user: User) {
    const totalEqs = getRandomInt(4, 3);
    let eqs: TutorEQ[] = [];
    for(let j = 0; j < totalEqs; j++) {
        eqs.push(generateRandomEq(j));
    }
    return new Tutor({
        userId: user.id,
        enabled: true,
        verified: false,
        name: user.name,
        gender: user.gender,
        profilePicture: user.profilePicture,
        rating: getRandomInt(5),
        educationQualifications: eqs,
        preference: generateRandomPreference(user.address)
    })
}


function getInstitute(type: string)  {
    if(type === 'secondary') return getRandomEnumValue(randomParams.sInstitutes);
    if(type === 'higherSecondary') return getRandomEnumValue(randomParams.hsInstitutes);
    return getRandomEnumValue(randomParams.ugradInstitutes);
}

function getDept(type: string) {
    if(type === 'secondary' || type === 'higherSecondary') return undefined;
    return randomParams.departments[getRandomInt(randomParams.departments.length)];
}

function getGroup(type: string) {
    if(type === 'secondary' || type === 'higherSecondary') return randomParams.groups[getRandomInt(randomParams.groups.length)]
    return undefined;
}

function getMedium(type: string) {
    if(type === 'secondary' || type === 'higherSecondary') return "bangla";
    return "english"

}

function getLevel(type: string) {
    if(type === 'secondary' || type === 'higherSecondary') return undefined;
    return getRandomInt(4, 1);
}

function getTerm(type: string) {
    if(type === 'secondary' || type === 'higherSecondary') return undefined;
    return getRandomInt(2, 1);
}

function generateRandomEq(typeIndex: number) {
    const degree = ConstantEnums.educationDegree[typeIndex];
    const department = getDept(degree);
    const group = getGroup(degree);
    const institute = getInstitute(degree);
    const medium = getMedium(degree);
    return new TutorEQ({
        degree,
        group,
        medium,
        department,
        institute,
        level: getLevel(degree),
        term: getTerm(degree)
    })
}

function generateRandomFreeTimes() {
    const totalFreeTimes = getRandomInt(3, 1);
    let freeTimes = []
    for(let i = 0; i < totalFreeTimes; i++) {
        freeTimes.push(getRandomEnumValue(ConstantEnums.schedules))
    }
    return freeTimes;
}

function generateRandomSchedule(): Schedule {
    let schedule: Schedule = new Schedule({});
    for(const day of ConstantEnums.days) {
        schedule[day] = generateRandomFreeTimes();
    }
    return schedule;
}


function generateRandomRemuneration(type: string){
    let totalSubjects = getRandomInt(1, 3);
    let subjects: string[] = [];
    for(let i = 0; i < totalSubjects; i++) {
        subjects.push(randomParams.subjects[getRandomInt(randomParams.subjects.length)]);
    }
    const fr = getRandomInt(20, 10);
    const t = getRandomInt(fr + 5, fr);
    return new Remuneration({
        type,
        subjects,
        from: fr * 500,
        to: t * 500
    })
}

function generateRandomPreference(address: Address): Preference {
    const totalAreas = getRandomInt(6, 1);
    let areasNeeded:string[] = [];

    for(let i = 0; i < totalAreas; i++) {
        areasNeeded.push(Areas[address.district][getRandomInt(Areas[address.district].length)]);
    }

    const totalRems = getRandomInt(2, 1);
    const remunerations: Remuneration[] = [];
    for(let i = 0; i < totalRems; i++) {
        remunerations.push(generateRandomRemuneration(ConstantEnums.tuitionType[i]));
    }

    return new Preference({
        gender: getRandomEnumValue(ConstantEnums.genderPref),
        country: address.country,
        district: address.district,
        areas: areasNeeded,
        schedule: generateRandomSchedule(),
        remunerations
    })
}