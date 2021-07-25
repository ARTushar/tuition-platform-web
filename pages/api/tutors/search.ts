import {createNC} from "../../../lib/utils/ncHandler";
import ShortTutor from "../../../lib/models/tutor/shortTutor";
import {debug, getKeys} from "../../../lib/utils/helpers";

const handler = createNC();

handler
    .get(async (req, res, next) => {
        debug("filter", "query", req.query);
        try {
            for(const key of getKeys(req.query)) {
                if(req.query[key].length === 0 ) {
                    delete req.query[key];
                }
            }
            debug("after query filter", "query", req.query);
            const results = await ShortTutor.getTutors(req.query);
            res.status(200).json(results);
        } catch (e) {
            next(e);
        }
    });

export default handler;