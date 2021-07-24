import {createNC} from "../../../lib/utils/ncHandler";
import {createNotFoundError} from "../../../lib/utils/errorCreator";
import verifyUser from "../../../lib/middlewares/verifyUser";
import Student from "../../../lib/models/student/student";

const handler = createNC();

handler
    .get(verifyUser, async (req, res, next) => {
        try {
            // @ts-ignore
            const student = await Student.get(req.user.id);
            if(!student) return next(createNotFoundError('Not found'));
            res.status(200).json(student);
        } catch (e) {
            next(e);
        }
    })
    .post(verifyUser, async (req, res, next) => {
        try {
            const student = await Student.create(req.user.userId, req.body);
            res.status(200).json(student);
        } catch (e) {
            next(e);
        }
    })
    .put(verifyUser, async (req, res, next) => {
        try {
            const student = await Student.update(req.user.userId, req.body);
            res.status(200).json(student);
        } catch (e) {
            next(e);
        }
    })

export default handler;
