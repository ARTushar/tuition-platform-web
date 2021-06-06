import {createNC} from "../../../lib/utils/ncHandler";

const handler = createNC();

handler.get((req, res, next) => {
    res.status(200);
});

export default handler;