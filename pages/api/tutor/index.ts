import {createNC} from "../../../lib/utils/ncHandler";
import Tutor from "../../../lib/models/tutor/tutor";
import {createNotFoundError} from "../../../lib/utils/errorCreator";
import verifyUser from "../../../lib/middlewares/verifyUser";

const handler = createNC();

handler
    .get(verifyUser, async (req, res, next) => {
        try {
            // @ts-ignore
            let tutor: any = await Tutor.getTutorById(req.user.id);
            if(!tutor) {
                tutor = {};
            }
            let updatedTutor = JSON.parse(JSON.stringify(tutor))

            updatedTutor.name = req.user.name;
            updatedTutor.mobileNumber = req.user.mobileNumber;
            updatedTutor.email = req.user.email;
            updatedTutor.address = req.user.address;
            updatedTutor.gender = req.user.gender;
            updatedTutor.userId = req.user.id;

            res.status(200).json(updatedTutor);
        } catch (e) {
            next(e);
        }
    })
    .post(verifyUser, async (req, res, next) => {
        try {
            const tutor = await Tutor.create(req.user.id, req.body);
            res.status(200).json(tutor);
        } catch (e) {
            next(e);
        }
    })
    .put(verifyUser, async (req, res, next) => {
        try {
            const tutor = await Tutor.update(req.user.id, req.body);
            res.status(200).json(tutor);
        } catch (e) {
            next(e);
        }
    })

export default handler;