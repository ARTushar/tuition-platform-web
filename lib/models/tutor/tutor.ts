import TutorEQ from "./tutorEQ";
import {VideoLink} from "../utils/videoLink";
import Preference from "./preference";
import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {PreferenceAliases, TutorAliases} from "../../data-layer/utils/aliases";
import {AttributeValue} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";

interface ConstructorParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    name: string;
    gender: string;
    profilePicture: string;
    rating: number;
    educationQualifications: TutorEQ[];
    introVideoLink?: string;
    demoVideoLinks?: VideoLink[];
    introText?: string;
    preference: Preference;
}

export default class Tutor{
    userId: string;
    enabled: boolean;
    verified: boolean;
    name: string;
    gender: string;
    profilePicture: string;
    rating: number;
    educationQualifications: TutorEQ[];
    introVideoLink: string;
    demoVideoLinks: VideoLink[];
    introText: string;
    preference: Preference;
    createdAt: string;
    updatedAt: string;


    constructor({userId, enabled, verified, name, gender, profilePicture, rating, educationQualifications, introVideoLink, demoVideoLinks, introText, preference}: ConstructorParams) {
        this.userId = userId;
        this.enabled = enabled;
        this.verified = verified;
        this.name = name;
        this.gender = gender;
        this.profilePicture = profilePicture;
        this.rating = rating;
        this.educationQualifications = educationQualifications;
        this.introVideoLink = introVideoLink;
        this.demoVideoLinks = demoVideoLinks;
        this.introText = introText;
        this.preference = preference;
    }

    mapToAlias() {
        return mapItemToAlias(TutorAliases, this);
    }

    static mapFromAlias(items: { [p: string]: AttributeValue }[]): Tutor {
        let tutor, eqs = [], vls = [];
        for (const rawItem of items) {
            const item = unmarshall(rawItem);
            switch (item._tp) {
                case 'Tutor':
                    tutor = mapItemFromAlias(TutorAliases, item);
                    break;
                case 'TutorPreference':
                    tutor['preference'] = mapItemFromAlias(PreferenceAliases, item);
                    break;
                default:
                    throw new Error("Invalid type");
            }
        }
        for (const eq of tutor.educationQualifications) {
            eqs.push(new TutorEQ(eq));
        }
        for (const vl of tutor.demoVideoLinks) {
            vls.push(new VideoLink(vl))
        }
        return new Tutor({
            ...tutor,
            educationQualifications: eqs,
            demoVideoLinks: vls,
            preference: new Preference(tutor.preference)
        })
    }
}