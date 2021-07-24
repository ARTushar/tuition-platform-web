import {createNC} from "../../../lib/utils/ncHandler";
import Tutor from "../../../lib/models/tutor/tutor";
import {createNotFoundError} from "../../../lib/utils/errorCreator";
import verifyUser from "../../../lib/middlewares/verifyUser";

const handler = createNC();

handler
    .get(verifyUser, async (req, res, next) => {
        try {
            // @ts-ignore
            const tutor = await Tutor.getTutorById(req.user.id);
            if(!tutor) return next(createNotFoundError('Not found'));
            res.status(200).json(tutor);
        } catch (e) {
            next(e);
        }
    })
    .post(verifyUser, async (req, res, next) => {
        try {
            const tutor = await Tutor.create(req.user.userId, req.body);
            res.status(200).json(tutor);
        } catch (e) {
            next(e);
        }
    })
    .put(verifyUser, async (req, res, next) => {
        try {
            const tutor = await Tutor.update(req.user.userId, req.body);
            res.status(200).json(tutor);
        } catch (e) {
            next(e);
        }
    })

export default handler;