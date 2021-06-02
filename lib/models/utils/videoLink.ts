interface ConstructorParams {
    title: string;
    subject: string;
    videoLink: string;
}

export class VideoLink {
    title: string;
    subject: string;
    videoLink: string;


    constructor({title, subject, videoLink}: ConstructorParams) {
        this.title = title;
        this.subject = subject;
        this.videoLink = videoLink;
    }
}