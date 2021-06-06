import TutorEQ from "./tutorEQ";
import {VideoLink} from "../utils/videoLink";
import Preference from "./preference";
import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {PreferenceAliases, TutorAliases} from "../../data-layer/utils/aliases";
import {AttributeValue} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";
import {getTutorByUserId} from "../../data-layer/entities/tutor/getTutor";

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
        let eqs = []
        for(const edu of this.educationQualifications) {
            eqs.push(edu.mapToAlias())
        }
        return {
            ...mapItemToAlias(TutorAliases, this),
            [TutorAliases.educationQualifications]: eqs
        };
    }

    static mapFromAlias(items: { [p: string]: AttributeValue }[]): Tutor {
        let tutor, eqs = [], vls = [];
        let pref: Preference;
        for (const rawItem of items) {
            const item = unmarshall(rawItem);
            switch (item._tp) {
                case 'Tutor':
                    tutor = mapItemFromAlias(TutorAliases, item);
                    break;
                case 'TutorPreference':
                    pref = Preference.mapFromAlias(item)
                    break;
                default:
                    throw new Error("Invalid type");
            }
        }
        for (const eq of tutor.educationQualifications) {
            eqs.push(TutorEQ.mapFromAlias(eq));
        }
        if(tutor.demoVideoLinks) {
            for (const vl of tutor.demoVideoLinks) {
                vls.push(new VideoLink(vl))
            }
        }
        return new Tutor({
            ...tutor,
            educationQualifications: eqs,
            demoVideoLinks: vls,
            preference: pref
        })
    }

    static async getTutorById(id: string): Promise<Tutor> {
        try {
            return await getTutorByUserId(id);
        } catch (e) {
            throw e;
        }
    }
}