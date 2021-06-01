import { debug, objStringify } from '../utils/helpers';
import { createBadRequestError } from '../utils/errorCreator';
import Joi from 'joi';

export default function createValidation(schema: Joi.Schema, type: string) {
    return async function(req, res, next) {
        if (!schema) {
            debug('no validation schema found');
            return next();
        } else {
            if (req[type] === undefined) {
                debug(type, 'not found in the request');
                return next(createBadRequestError("Missing " + type + " in the request"));
            }
            try {
                debug('before validation', objStringify(req[type]));
                const value = await schema.validateAsync(req[type], {
                    allowUnknown: false
                })
                req[type] = value;
                debug('successfully validated', objStringify(value));
            } catch (e) {
                // debug('cannot validate', objStringify(e));
                return next(createBadRequestError(e.message));
            }
            return next();
        }
    }
}