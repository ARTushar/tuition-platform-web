import {createNC} from "../../../lib/utils/ncHandler";
import User from "../../../lib/models/user/user";
import verifyUser from "../../../lib/middlewares/verifyUser";
import {createNotFoundError} from "../../../lib/utils/errorCreator";

const handler = createNC();

handler
.post(async(req, res, next) => {
    try {
        const user = await User.verifyUser(req.body.email, req.body.password);
        if(!user) return next(createNotFoundError('User not found'));
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
})

export default handler;