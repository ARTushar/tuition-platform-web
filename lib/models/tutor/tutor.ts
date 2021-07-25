import TutorEQ from "./tutorEQ";
import {VideoLink} from "../utils/videoLink";
import Preference from "./preference";
import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {PreferenceAliases, TutorAliases} from "../../data-layer/utils/aliases";
import {AttributeValue} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";
import {getTutorByUserId} from "../../data-layer/entities/tutor/getTutor";
import updateTutor from "../../data-layer/entities/tutor/updateTutor";
import createTutor from "../../data-layer/entities/tutor/createTutor";
import {debug} from "../../utils/helpers";
import deleteTutor from "../../data-layer/entities/tutor/deleteTutor";

interface ConstructorParams {
    userId: string;
    enabled?: boolean;
    verified?: boolean;
    name: string;
    gender: string;
    profilePicture?: string;
    rating?: number;
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
            [TutorAliases.educationQualifications]: eqs,
            [TutorAliases.preference]: this.preference?.mapToAlias(),
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

    static constructFactory(tutor) {
        let links: VideoLink[] = [];
        let eqs: TutorEQ[] = [];

        if(tutor.demoVideoLinks) {
            for(const link of tutor.demoVideoLinks) {
                links.push(VideoLink.constructFactory(link));
            }
        }

        for(const eq of tutor.educationQualifications) {
            eqs.push(TutorEQ.constructFactory(eq));
        }

        return new Tutor({
            userId: tutor.userId,
            enabled: tutor.enabled,
            verified: tutor.verified,
            name: tutor.name,
            gender: tutor.gender,
            profilePicture: tutor.profilePicture,
            rating: tutor.rating,
            educationQualifications: eqs,
            introVideoLink: tutor.introVideoLink,
            demoVideoLinks: links,
            introText: tutor.introText,
            preference: Preference.constructFactory(tutor.preference)
        });
    }

    static async create(id, tutor) {
        tutor.educationQualifications = [
            {
                degree: "undergraduate",
                institute: tutor.education.university,
                level: tutor.education.levelOrYear,
                department: tutor.education.department
            },
            {
                degree: "college",
                institute: tutor.education.college
            }
        ]
        delete tutor.education;

        debug("before creation tutor", tutor);

        try  {
            const oldTutor = await getTutorByUserId(id);
            if(oldTutor) await deleteTutor(id);
            let newt = Tutor.constructFactory(tutor);
            newt.createdAt = oldTutor.createdAt;
            newt.updatedAt = new Date().toISOString();
            return await createTutor(id, newt);
        } catch (e) {
            debug("inside tutor error", e);
            throw e;
        }
    }

    static async update(userId, newTutor) {
        newTutor.educationQualifications = [
            {
                degree: "undergraduate",
                institute: newTutor.education.university,
                level: newTutor.education.levelOrYear,
                department: newTutor.education.department
            },
            {
                degree: "college",
                institute: newTutor.education.college
            }
        ]
        delete newTutor.education;
        try {
            return await updateTutor(userId, Tutor.constructFactory(newTutor), newTutor.gender);
        } catch (e) {
            throw e;
        }
    }
}