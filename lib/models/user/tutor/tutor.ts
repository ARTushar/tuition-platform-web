import User from "../user";
import TutorEQ from "./tutorEQ";
import {VideoLink} from "../../utils/videoLink";
import Preference from "./preference";


export default class Tutor extends User {
    educationQualifications: TutorEQ[];
    introVideoLink: string;
    demoVideoLinks: VideoLink[];
    preference: Preference;


    constructor(id: string, name: string, email: string, emailVerified: string, accountType: string, mobileNumber: string, profilePicture: string, gender: string, createdAt: string, updatedAt: string, educationQualifications: TutorEQ[], introVideoLink: string, demoVideoLinks: VideoLink[], preference: Preference) {
        super({id, name, email, emailVerified, accountType, mobileNumber, profilePicture, gender, createdAt, updatedAt});
        this.educationQualifications = educationQualifications;
        this.introVideoLink = introVideoLink;
        this.demoVideoLinks = demoVideoLinks;
        this.preference = preference;
    }
}