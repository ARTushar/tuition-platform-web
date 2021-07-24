import {createNC} from "../../../lib/utils/ncHandler";
import {createNotFoundError} from "../../../lib/utils/errorCreator";
import User from "../../../lib/models/user/user";

const handler = createNC();

handler
    .get(async (req, res, next) => {
        try {
            // @ts-ignore
            const user = await User.getUserByiId(req.query.id);
            if(!user) return next(createNotFoundError('Not found'));
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    });

export default handler;