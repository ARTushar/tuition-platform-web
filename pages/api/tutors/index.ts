import {createNC} from "../../../lib/utils/ncHandler";
import ShortTutor from "../../../lib/models/tutor/shortTutor";

const handler = createNC();

handler
    .get(async (req, res, next) => {
        try {
            const results = await ShortTutor.getAllTutors();
            res.status(200).json(results);
        } catch (e) {
            next(e);
        }
    });

export default handler;
