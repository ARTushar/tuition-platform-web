import { createForbiddenError, createUnauthorizedError } from "../utils/errorCreator";

function verifyModerator(req, res, next) {
  if (req.user.accountType === 'moderator') {
    next();
  } else {
    next(createForbiddenError('Unauthorized user'));
  }
}

export default verifyModerator;