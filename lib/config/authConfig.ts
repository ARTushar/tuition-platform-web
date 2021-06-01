export default {
    googleClientId: process.env.GOOGLE_ID,
    googleClientSecret: process.env.GOOGLE_SECRET,
    facebookClientId: process.env.FACEBOOK_ID,
    facebookClientSecret: process.env.FACEBOOK_SECRET,
    emailUser: process.env.EMAIL_SERVER_USER,
    emailPassword: process.env.EMAIL_SERVER_PASSWORD,
    emailHost: process.env.EMAIL_SERVER_HOST,
    emailPort: parseInt(process.env.EMAIL_SERVER_PORT),
    emailFrom: process.env.EMAIL_SERVER_EMAIL_FROM,
}
