export function createError(statusCode, message) {
    const err:any = new Error(message);
    err.status = statusCode;
    return err;
}

export function createNotFoundError(message) {
    return createError(404, message);
}

export function createServerError(message) {
    return createError(500, message);
}

export function createUnauthorizedError() {
    return createError(401, 'Unauthorized');
}

export function createForbiddenError(message) {
    return createError(403, message);
}

export function createBadRequestError(message) {
    return createError(400, message);
}

export function createOverRateError() {
    return createError(429, 'too many incoming');
}
