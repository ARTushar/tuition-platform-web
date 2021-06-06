import {createNC} from "../../../lib/utils/ncHandler";
import Tutor from "../../../lib/models/tutor/tutor";
import {createNotFoundError} from "../../../lib/utils/errorCreator";

const handler = createNC();

handler
    .get(async (req, res, next) => {
        try {
            // @ts-ignore
            const tutor = await Tutor.getTutorById(req.query.id);
            if(!tutor) return next(createNotFoundError('Not found'));
            res.status(200).json(tutor);
        } catch (e) {
            next(e);
        }
    });

export default handler;