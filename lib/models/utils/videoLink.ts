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

    static constructFactory(link) {
        return new VideoLink({
            title: link.title,
            subject: link.subject,
            videoLink: link.videoLink
        });
    }
}