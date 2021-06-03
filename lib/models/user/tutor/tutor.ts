import User from "../user";
import TutorEQ from "./tutorEQ";
import {VideoLink} from "../../utils/videoLink";
import Preference from "./preference";


interface ConstructorParams {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    accountType: string;
    mobileNumber: string;
    profilePicture: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
    educationQualifications: TutorEQ[];
    introVideoLink: string;
    demoVideoLinks: VideoLink[];
    introText: string;
    preference: Preference;
}

export default class Tutor extends User {
    educationQualifications: TutorEQ[];
    introVideoLink: string;
    demoVideoLinks: VideoLink[];
    introText: string;
    preference: Preference;


    constructor({id, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, createdAt, updatedAt, educationQualifications, introVideoLink, demoVideoLinks, introText, preference}: ConstructorParams) {
        super({id, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, createdAt, updatedAt});
        this.educationQualifications = educationQualifications;
        this.introVideoLink = introVideoLink;
        this.demoVideoLinks = demoVideoLinks;
        this.introText = introText;
        this.preference = preference;
    }
}