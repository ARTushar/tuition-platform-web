import {createNC} from "../../../lib/utils/ncHandler";
import areas from '../../../lib/files/areas.json';

const handler = createNC();

handler.get((req, res, next) => {
    res.status(200).json(areas);
})