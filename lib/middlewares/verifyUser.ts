import User from "../models/user/user";
import {createForbiddenError} from "../utils/errorCreator";
import {debug} from "../utils/helpers";

// import { debug } from '../utils/helpers';
// import { createForbiddenError } from '../utils/errorCreator';
// import User from '../models/user/User';
// import admin from 'firebase-admin';
// import serviceAccount from '../config/firebase-config';
//
// export default async function(req, res, next){
//
//     if(!admin.apps.length){
//         admin.initializeApp({
//             credential: admin.credential.cert(serviceAccount)
//         })
//     }
//     try {
//         const decodedToken = await admin
//           .auth()
//           .verifyIdToken(req.headers.bearertoken);
//
//         if(decodedToken) {
//             debug("Decoded Token ", decodedToken);
//             const uid = decodedToken.uid;
//             debug('uid', uid);
//             const user = User.getById(uid);
//             debug("user get", user);
//             if(user) {
//                 req.user = user;
//                 return next();
//             } else {
//                 req.user = await User.createAccountByFirebase(decodedToken.email, decodedToken.email_verified, uid);
//                 debug("user created", req.user);
//                 return next();
//             }
//         } else {
//             debug('error', );
//             return next(createForbiddenError('Unauthorized user'));
//         }
//
//     } catch (e) {
//         debug('error', e.message);
//         return next(createForbiddenError('Unauthorized user: '+ e.message));
//     }
// }


export default async function (req, res, next) {
    const user = await User.verifyUser(req.headers.email, req.headers.password);
    if(user) {
        req.user = user;
        debug("verified user", req.user);
        return next();
    }
    return next(createForbiddenError('Unauthorized user'));
}