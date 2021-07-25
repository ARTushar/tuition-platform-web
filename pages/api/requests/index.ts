import {createNC} from "../../../lib/utils/ncHandler";
import {createForbiddenError, createNotFoundError} from "../../../lib/utils/errorCreator";
import verifyUser from "../../../lib/middlewares/verifyUser";
import Request from "../../../lib/models/request/Request";

const handler = createNC();

handler
    .get(verifyUser, async (req, res, next) => {
        try {
            // @ts-ignore
            let requests;
            if(req.user.accountType === 'tutor') requests = Request.getTutorRequests(req.user.id);
            else if(req.user.accountType === 'student') requests = Request.getStudentRequests(req.user.id);

            if(!requests) return next(createNotFoundError('Not found'));

            res.status(200).json(requests);
        } catch (e) {
            next(e);
        }
    })
    .post(verifyUser, async (req, res, next) => {
        try {
            if(req.user.id !== req.body.studentId) return next(createForbiddenError("Invalid student ID"));
            if(req.user.accountType !== 'student') return next(createForbiddenError("Invalid account"));

            const request = await Request.create(req.body);
            res.status(200).json(request);
        } catch (e) {
            next(e);
        }
    })
    .put(verifyUser, async (req, res, next) => {
        try {
            const updated = await Request.updateStatus(req.user.userId, req.body.id, req.body.status);
            if(!updated) return next(createNotFoundError("Not found"));
            res.status(200).json(updated);
        } catch (e) {
            next(e);
        }
    })

export default handler;
