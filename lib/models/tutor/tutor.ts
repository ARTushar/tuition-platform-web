import TutorEQ from "./tutorEQ";
import {VideoLink} from "../utils/videoLink";
import Preference from "./preference";
interface ConstructorParams {
    userId: string;
    educationQualifications: TutorEQ[];
    introVideoLink: string;
    demoVideoLinks: VideoLink[];
    introText: string;
    preference: Preference;
}

export default class Tutor{
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    educationQualifications: TutorEQ[];
    introVideoLink: string;
    demoVideoLinks: VideoLink[];
    introText: string;
    preference: Preference;
    createdAt: string;
    updatedAt: string;


    constructor({userId, educationQualifications, introVideoLink, demoVideoLinks, introText, preference}: ConstructorParams) {
        this.userId = userId;
        this.educationQualifications = educationQualifications;
        this.introVideoLink = introVideoLink;
        this.demoVideoLinks = demoVideoLinks;
        this.introText = introText;
        this.preference = preference;
    }
}